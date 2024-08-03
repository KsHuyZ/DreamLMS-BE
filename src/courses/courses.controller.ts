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
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import {
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
    groups: ['admin'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProfileDto: CreateCourseDto): Promise<Course> {
    return this.coursesService.create(createProfileDto);
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
    groups: ['admin'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  update(
    @Param('id') id: Course['id'],
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<Course | null> {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: Course['id']): Promise<void> {
    return this.coursesService.remove(id);
  }
}
