import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { LessonVideo } from '../../domain/lesson-video';

export abstract class LessonVideoRepository {
  abstract create(
    data: Omit<LessonVideo, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<LessonVideo>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<LessonVideo[]>;

  abstract findById(id: LessonVideo['id']): Promise<NullableType<LessonVideo>>;

  abstract update(
    id: LessonVideo['id'],
    payload: DeepPartial<LessonVideo>,
  ): Promise<LessonVideo | null>;

  abstract remove(id: LessonVideo['id']): Promise<void>;

  abstract findByVideoId(videoId: string): Promise<NullableType<LessonVideo>>;
}
