import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { NullableType } from '../utils/types/nullable.type';
import { FilterCourseDto, SortCourseDto } from './dto/query-course.dto';
import { CourseRepository } from './infrastructure/persistence/course.repository';
import { Course } from './domain/course';
import { StatusEnum } from '../statuses/statuses.enum';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { User } from '../users/domain/user';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly coursesRepository: CourseRepository) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const relatedCourses = createCourseDto.related.map((relatedCourse) => {
      const course = new Course();
      course.id = relatedCourse;
      return course;
    });

    const createdBy = new User();
    createdBy.id = createCourseDto.createdBy;

    const clonedPayload = {
      ...createCourseDto,
      related: relatedCourses,
      createdBy,
    };
    if (clonedPayload.status?.id) {
      const statusObject = Object.values(StatusEnum)
        .map(String)
        .includes(String(clonedPayload.status.id));
      if (!statusObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            status: 'statusNotExists',
          },
        });
      }
    }

    return this.coursesRepository.create(clonedPayload);
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    userId,
  }: {
    filterOptions?: FilterCourseDto | null;
    sortOptions?: SortCourseDto[] | null;
    paginationOptions: IPaginationOptions;
    userId?: string;
  }): Promise<Course[]> {
    return this.coursesRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
      userId,
    });
  }

  findById(id: Course['id']): Promise<NullableType<Course>> {
    return this.coursesRepository.findById(id);
  }

  async update(
    id: Course['id'],
    payload: UpdateCourseDto,
  ): Promise<Course | null> {
    const createdBy = new User();
    createdBy.id = payload.createdBy;
    const clonedPayload = { ...payload, createdBy };

    return this.coursesRepository.update(id, clonedPayload);
  }

  async remove(id: Course['id']): Promise<void> {
    await this.coursesRepository.remove(id);
  }
}
