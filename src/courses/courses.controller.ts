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
  UploadedFiles,
  UploadedFile,
  UseGuards,
  Put,
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
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { CourseStatusEnum } from '../statuses/statuses.enum';
import { FilterCourseExceptIdsDto } from './dto/query-course-except-ids.dto';
import path from 'path';
import { diskStorage } from 'multer';
import { AdditionCourseDto } from './dto/addition-course.dto';
import { TCourseQuery } from './types/course.enum';

@ApiTags('Courses')
@Controller({
  path: 'courses',
  version: '1',
})
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

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
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  @UseGuards(AuthGuard('jwt'))
  @ApiConsumes('multipart/form-data')
  update(
    @Param('id') id: Course['id'],
    @Body() updateCourseDto: UpdateCourseDto,
    @UploadedFiles()
    files: { image?: Express.Multer.File },
    @Request() request,
  ): Promise<Course | null> {
    const createdBy = request.user as User | undefined;
    return this.coursesService.update(id, {
      ...updateCourseDto,
      ...files,
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
    @UploadedFile() video: Express.Multer.File,
    @Body() payload: AdditionCourseDto,
    @Param('id') id: string,
  ) {
    const { related } = payload;
    const createdBy = request.user as User;
    await this.coursesService.updateAddition(id, video, related, createdBy);
  }
}
