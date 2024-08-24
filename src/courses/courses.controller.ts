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
import { infinityPagination } from '../utils/infinity-pagination';
import { User } from '../users/domain/user';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';

@ApiTags('Courses')
@Controller({
  path: 'courses',
  version: '1',
})
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @ApiCreatedResponse({
    type: Course,
  })
  @SerializeOptions({
    groups: ['admin', 'teacher'],
  })
  @Post()
  @Roles(RoleEnum.TEACHER)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'videoPreview', maxCount: 1 },
    ]),
  )
  @ApiConsumes('multipart/form-data')
  create(
    @Body() createProfileDto: CreateCourseDto,
    @UploadedFiles()
    files: { image: Express.Multer.File; videoPreview: Express.Multer.File },
  ): Promise<Course> {
    return this.coursesService.create({ ...createProfileDto, ...files });
  }

  @ApiOkResponse({
    type: InfinityPaginationResponse(Course),
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryCourseDto,
    @Request() request,
  ): Promise<InfinityPaginationResponseDto<Course>> {
    const user = request.user as User | undefined;
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.coursesService.findManyWithPagination({
        filterOptions: query?.filters,
        sortOptions: query?.sort,
        paginationOptions: {
          page,
          limit,
        },
        userId: user?.id,
      }),
      { page, limit },
    );
  }

  @ApiOkResponse({
    type: Course,
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
    type: Course,
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
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'videoPreview', maxCount: 1 },
    ]),
  )
  @ApiConsumes('multipart/form-data')
  update(
    @Param('id') id: Course['id'],
    @Body() updateCourseDto: UpdateCourseDto,
    @UploadedFiles()
    files: { image?: Express.Multer.File; videoPreview?: Express.Multer.File },
  ): Promise<Course | null> {
    return this.coursesService.update(id, { ...updateCourseDto, ...files });
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
}
