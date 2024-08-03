import { NullableType } from '../../../utils/types/nullable.type';
import { RelatedCourse } from '../../domain/related-course';

export abstract class RelatedCourseRepository {
  abstract create(data: Omit<RelatedCourse, 'id'>): Promise<RelatedCourse>;

  abstract insertRelatedCourses(
    data: Omit<RelatedCourse, 'id'>[],
  ): Promise<RelatedCourse[]>;

  abstract findById(
    id: RelatedCourse['id'],
  ): Promise<NullableType<RelatedCourse>>;

  abstract findByCourseId(
    courseId: RelatedCourse['courseId'],
  ): Promise<NullableType<RelatedCourse[]>>;

  abstract remove(id: RelatedCourse['id']): Promise<void>;
}
