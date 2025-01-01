import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpCode,
  SerializeOptions,
  Request,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Put,
  BadRequestException,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import {
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { NullableType } from '../utils/types/nullable.type';
import { QueryCourseDto } from './dto/query-course.dto';
import { Course } from './domain/course';
import { CoursesService } from './courses.service';
import { User } from '../users/domain/user';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { CourseStatusEnum } from '../statuses/statuses.enum';
import { FilterCourseExceptIdsDto } from './dto/query-course-except-ids.dto';
import path from 'path';
import { diskStorage } from 'multer';
import { AdditionCourseDto } from './dto/addition-course.dto';
import { TCourseQuery } from './types/course.enum';
import { CourseGuestDto } from './dto/course-guest.dto';
import { Enroll } from '../enrolls/domain/enroll';
import Stripe from 'stripe';
import { PaymentsService } from '../payments/payments.service';
import { CourseLearningDto } from './dto/course-learning.dto';
import { OptionalJwtAuthGuard } from '../utils/optional-auth-guard';

@ApiTags('Courses')
@Controller({
  path: 'courses',
  version: '1',
})
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly paymentsService: PaymentsService,
  ) {}

  @ApiCreatedResponse({
    type: () => Course,
  })
  @SerializeOptions({
    groups: ['admin', 'teacher'],
  })
  @Post()
  @Roles(RoleEnum.TEACHER)
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  create(
    @Body() createProfileDto: CreateCourseDto,
    @UploadedFile()
    image: Express.Multer.File,
    @Request() request,
  ): Promise<Course> {
    return this.coursesService.create({
      ...createProfileDto,
      image,
      createdBy: request.user as User,
    });
  }

  @ApiOkResponse({
    type: InfinityPaginationResponse(Course),
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryCourseDto,
    @Request() request,
  ): Promise<InfinityPaginationResponseDto<TCourseQuery>> {
    const user = request.user as User | undefined;
    const page = query?.page ?? 1;
    const limit = 40;

    return this.coursesService.findManyWithPagination({
      filterOptions: query?.filters,
      sortOptions: query?.sort,
      paginationOptions: {
        page,
        limit,
      },
      userId: user?.id,
    });
  }

  @ApiOkResponse({
    type: InfinityPaginationResponse(Course),
  })
  @Get('admin')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async findAllByAdmin(
    @Query() query: QueryCourseDto,
    @Request() request,
  ): Promise<InfinityPaginationResponseDto<TCourseQuery>> {
    const user = request.user as User | undefined;
    const page = query?.page ?? 1;
    const limit = 40;
    console.log({ role: user });
    if (user?.role !== RoleEnum.ADMIN)
      throw new BadRequestException('You are not admin');
    return this.coursesService.findManyWithPaginationByAdmin({
      filterOptions: query?.filters,
      sortOptions: query?.sort,
      paginationOptions: {
        page,
        limit,
      },
    });
  }

  @ApiOkResponse({
    type: InfinityPaginationResponse(Course),
  })
  @Get('teacher')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async findAllByTeacher(
    @Query() query: QueryCourseDto,
    @Request() request,
  ): Promise<InfinityPaginationResponseDto<Course>> {
    const user = request.user as User | undefined;
    const page = query?.page ?? 1;
    const limit = 40;

    return this.coursesService.findManyByTeacherWithPagination({
      filterOptions: query?.filters,
      sortOptions: query?.sort,
      paginationOptions: {
        page,
        limit,
      },
      teacherId: user?.id ?? '',
    });
  }

  @Get('active-course')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  getAnalyzingActiveCourse(@Request() request) {
    const userId = request.user.id;
    return this.coursesService.getAnalyzingActiveCourse(userId);
  }

  @Get('total-course')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  getAnalyzingTotalCourse(@Request() request) {
    const userId = request.user.id;
    return this.coursesService.getAnalyzingTotalCourse(userId);
  }

  @ApiOkResponse({
    type: () => Course,
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: Course['id']): Promise<NullableType<Course>> {
    return this.coursesService.findById(id);
  }

  @ApiOkResponse({
    type: () => CourseGuestDto,
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @UseGuards(OptionalJwtAuthGuard)
  @Get('guest/:id')
  @HttpCode(HttpStatus.OK)
  findCourseByGuest(
    @Param('id') id: Course['id'],
    @Request() request,
  ): Promise<NullableType<CourseGuestDto>> {
    const userId = request.user?.id as string | undefined;
    return this.coursesService.findCourseByGuest(id, userId);
  }

  @ApiOkResponse({
    type: () => CourseGuestDto,
  })
  @UseGuards(OptionalJwtAuthGuard)
  @Get('related/:id')
  @HttpCode(HttpStatus.OK)
  findCourseRelated(@Param('id') id: Course['id']): Promise<TCourseQuery[]> {
    return this.coursesService.findCourseRelated(id);
  }

  @ApiOkResponse({
    type: () => CourseLearningDto,
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('learn/:id')
  @HttpCode(HttpStatus.OK)
  findByLearnLearn(
    @Param('id') id: Course['id'],
    @Request() request,
  ): Promise<NullableType<CourseLearningDto>> {
    const userId = request.user?.id as string | undefined;
    return this.coursesService.findByLearn(id, userId);
  }

  @ApiOkResponse({
    type: () => Course,
  })
  @SerializeOptions({
    groups: ['admin', 'teacher'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(AuthGuard('jwt'))
  @ApiConsumes('multipart/form-data')
  update(
    @Param('id') id: Course['id'],
    @Body() updateCourseDto: UpdateCourseDto,
    @UploadedFile()
    image: Express.Multer.File,
    @Request() request,
  ): Promise<Course | null> {
    const createdBy = request.user as User | undefined;
    return this.coursesService.update(id, {
      ...updateCourseDto,
      image,
      createdBy,
    });
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: () => Course,
  })
  @SerializeOptions({
    groups: ['admin', 'teacher'],
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  changeStatus(
    @Param('id') id: Course['id'],
    @Body() payload: { status: CourseStatusEnum },
  ) {
    return this.coursesService.changeStatus(id, payload);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @SerializeOptions({
    groups: ['admin', 'teacher'],
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: Course['id']): Promise<void> {
    return this.coursesService.remove(id);
  }

  @ApiOkResponse({
    type: Course,
  })
  @Post('except-ids')
  @HttpCode(HttpStatus.OK)
  findByExceptIds(@Body() payload: FilterCourseExceptIdsDto) {
    const { ids, name } = payload;
    return this.coursesService.findExceptIds(ids, name);
  }

  @Put('addition/:id')
  @ApiCreatedResponse({
    type: Course,
  })
  @UseInterceptors(
    FileInterceptor('video', {
      storage: diskStorage({
        destination: './video-upload',
        filename: (_, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = path.extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          cb(null, filename);
        },
      }),
    }),
  )
  @UseGuards(AuthGuard('jwt'))
  @ApiConsumes('multipart/form-data')
  async additionInfoCourse(
    @Request() request,
    @Body() payload: AdditionCourseDto,
    @Param('id') id: string,
    @UploadedFile() video?: Express.Multer.File,
  ) {
    const { related } = payload;
    const createdBy = request.user as User;
    await this.coursesService.updateAddition(id, related, createdBy, video);
  }

  @ApiCreatedResponse({
    type: Enroll,
  })
  @Get('enroll/:id')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('jwt'))
  enrollFreeCourse(
    @Request() request,
    @Param('id') courseId: string,
  ): Promise<Enroll> {
    const userId = request.user?.id as string;
    return this.coursesService.enrollFreeCourse({
      courseId,
      userId,
    });
  }

  @ApiCreatedResponse({
    type: Promise<Stripe.Response<Stripe.PaymentIntent>>,
  })
  @Get('payment/:id')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('jwt'))
  enrollCourse(
    @Request() request,
    @Param('id') courseId: string,
  ): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    const userId = request.user?.id as string;
    return this.coursesService.enrollCourse({ courseId, userId });
  }
}
