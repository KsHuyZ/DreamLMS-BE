import { Course } from '../../../courses/domain/course';
import { LessonVideo } from '../../../lesson-videos/domain/lesson-video';
import { User } from '../../../users/domain/user';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { UserVideo } from '../../domain/user-video';

export abstract class UserVideoRepository {
  abstract create(
    data: Omit<UserVideo, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<UserVideo>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<UserVideo[]>;

  abstract findById(id: UserVideo['id']): Promise<NullableType<UserVideo>>;

  abstract findByUserIdAndVideoId(
    userId: User['id'],
    videoId: LessonVideo['id'],
  ): Promise<NullableType<UserVideo>>;

  abstract update(
    id: UserVideo['id'],
    payload: DeepPartial<UserVideo>,
  ): Promise<UserVideo | null>;

  abstract remove(id: UserVideo['id']): Promise<void>;

  abstract countByUserIdAndCourseId(
    userId: User['id'],
    courseId: Course['id'],
  ): Promise<number>;

  abstract findByUserIdAndCourseId(
    userId: User['id'],
    courseId: Course['id'],
  ): Promise<UserVideo[]>;
}
