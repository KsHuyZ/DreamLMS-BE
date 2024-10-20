import { InfinityPaginationResponseDto } from '../../../utils/dto/infinity-pagination-response.dto';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Course } from '../../domain/course';

import { FilterCourseDto, SortCourseDto } from '../../dto/query-course.dto';

export abstract class CourseRepository {
  abstract create(
    data: Omit<
      Course,
      | 'id'
      | 'createdAt'
      | 'deletedAt'
      | 'updatedAt'
      | 'isDeleted'
      | 'enrolledCourses'
      | 'lessons'
      | 'related'
      | 'videoPreview'
      | 'status'
    >,
  ): Promise<Course>;

  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    userId,
  }: {
    filterOptions?: FilterCourseDto | null;
    sortOptions?: SortCourseDto[] | null;
    paginationOptions: IPaginationOptions;
    userId?: string;
  }): Promise<InfinityPaginationResponseDto<Course>>;

  abstract findManyByTeacherWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    teacherId,
  }: {
    filterOptions?: FilterCourseDto | null;
    sortOptions?: SortCourseDto[] | null;
    paginationOptions: IPaginationOptions;
    teacherId: string;
  });

  abstract findById(id: Course['id']): Promise<NullableType<Course>>;

  abstract update(
    id: Course['id'],
    payload: Partial<Course>,
  ): Promise<Course | null>;

  abstract remove(id: Course['id']): Promise<void>;
}
