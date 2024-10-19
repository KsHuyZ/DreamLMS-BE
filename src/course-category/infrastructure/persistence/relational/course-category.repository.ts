import { DeepPartial } from '../../../../utils/types/deep-partial.type';
import { NullableType } from '../../../../utils/types/nullable.type';
import { CourseCategory } from '../../../domain/course-category';

export abstract class CourseCategoryRepository {
  abstract create(
    data: Omit<CourseCategory, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<CourseCategory>;

  abstract createMany(
    data: Omit<CourseCategory, 'id' | 'createdAt' | 'updatedAt'>[],
  ): Promise<CourseCategory[]>;

  abstract findById(
    id: CourseCategory['id'],
  ): Promise<NullableType<CourseCategory>>;

  abstract update(
    id: CourseCategory['id'],
    payload: DeepPartial<CourseCategory>,
  ): Promise<CourseCategory | null>;

  abstract remove(id: CourseCategory['id']): Promise<void>;
}
