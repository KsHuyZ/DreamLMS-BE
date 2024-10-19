import { DeepPartial } from '../../../../utils/types/deep-partial.type';
import { NullableType } from '../../../../utils/types/nullable.type';
import { CourseTag } from '../../../domain/course-tag';

export abstract class CourseTagRepository {
  abstract create(
    data: Omit<CourseTag, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<CourseTag>;

  abstract createMany(
    data: Omit<CourseTag, 'id' | 'createdAt' | 'updatedAt'>[],
  ): Promise<CourseTag[]>;

  abstract findById(id: CourseTag['id']): Promise<NullableType<CourseTag>>;

  abstract update(
    id: CourseTag['id'],
    payload: DeepPartial<CourseTag>,
  ): Promise<CourseTag | null>;

  abstract remove(id: CourseTag['id']): Promise<void>;
}
