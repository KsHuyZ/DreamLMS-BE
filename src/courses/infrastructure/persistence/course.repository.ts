import { User } from '../../../users/domain/user';
import { InfinityPaginationResponseDto } from '../../../utils/dto/infinity-pagination-response.dto';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Course } from '../../domain/course';
import { CourseGuestDto } from '../../dto/course-guest.dto';

import { FilterCourseDto, SortCourseDto } from '../../dto/query-course.dto';
import { TCourseQuery } from '../../types/course.enum';

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
      | 'status'
      | 'courseVideo'
    >,
  ): Promise<Course>;

  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    userId,
  }: {
    filterOptions?: FilterCourseDto | null;
    sortOptions?: SortCourseDto | null;
    paginationOptions: IPaginationOptions;
    userId?: string;
  }): Promise<InfinityPaginationResponseDto<TCourseQuery>>;

  abstract findManyByTeacherWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    teacherId,
  }: {
    filterOptions?: FilterCourseDto | null;
    sortOptions?: SortCourseDto | null;
    paginationOptions: IPaginationOptions;
    teacherId: string;
  });

  abstract findById(id: Course['id']): Promise<NullableType<Course>>;

  abstract findCourseByGuest(
    id: Course['id'],
    userId?: User['id'],
  ): Promise<NullableType<CourseGuestDto>>;

  abstract update(
    id: Course['id'],
    payload: Partial<Course>,
  ): Promise<Course | null>;

  abstract remove(id: Course['id']): Promise<void>;

  abstract findExceptIds(
    ids: Course['id'][],
    name: Course['name'],
  ): Promise<Course[]>;

  abstract findByIds(ids: Course['id'][]): Promise<Course[]>;

  abstract getActiveCoursesInMonth(userId: User['id']): Promise<number>;
  abstract getPercentActiveCourses(userId: User['id']): Promise<number>;

  abstract getTotalCourseInMonth(userId: string): Promise<number>;
  abstract getTotalCourseLastMonth(userId: string): Promise<number>;

  abstract findCourseRelated(id: Course['id']): Promise<TCourseQuery[]>;

  abstract findManyWithPaginationByAdmin({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterCourseDto | null;
    sortOptions?: SortCourseDto | null;
    paginationOptions: IPaginationOptions;
  }): Promise<InfinityPaginationResponseDto<TCourseQuery>>;
}
