import { DeepPartial } from '../../../utils/types/deep-partial.type';
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
  }): Promise<Course[]>;

  abstract findById(id: Course['id']): Promise<NullableType<Course>>;

  abstract update(
    id: Course['id'],
    payload: DeepPartial<Course>,
  ): Promise<Course | null>;

  abstract remove(id: Course['id']): Promise<void>;
}
