import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { CourseVideo } from '../../domain/course-video';

export abstract class CourseVideoRepository {
  abstract create(
    data: Omit<CourseVideo, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<CourseVideo>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<CourseVideo[]>;

  abstract findById(id: CourseVideo['id']): Promise<NullableType<CourseVideo>>;

  abstract update(
    id: CourseVideo['id'],
    payload: DeepPartial<CourseVideo>,
  ): Promise<CourseVideo | null>;

  abstract remove(id: CourseVideo['id']): Promise<void>;
}
