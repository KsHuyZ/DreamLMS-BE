import { User } from '../../../users/domain/user';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { Video } from '../../domain/video';

export abstract class VideoRepository {
  abstract create(
    data: Omit<Video, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<Video>;

  abstract findAllByLessonId({
    lessonId,
  }: {
    lessonId: string;
  }): Promise<Video[]>;

  abstract findById(id: Video['id']): Promise<NullableType<Video>>;

  abstract update(
    id: Video['id'],
    payload: DeepPartial<Video>,
  ): Promise<Video | null>;

  abstract remove(id: Video['id']): Promise<void>;

  abstract getTotalSize(userId: User['id']): Promise<NullableType<number>>;
}
