import { DeepPartial } from '../../utils/types/deep-partial.type';
import { NullableType } from '../../utils/types/nullable.type';
import { Lesson } from '../domain/lesson';

export abstract class LessonRepository {
  abstract create(
    data: Omit<
      Lesson,
      | 'id'
      | 'createdAt'
      | 'deletedAt'
      | 'updatedAt'
      | 'videos'
      | 'quizzes'
      | 'disabled'
    >,
  ): Promise<Lesson>;

  abstract findById(id: Lesson['id']): Promise<NullableType<Lesson>>;

  abstract findByCourseId(id: string): Promise<Lesson[]>;

  abstract update(
    id: Lesson['id'],
    payload: DeepPartial<Lesson>,
  ): Promise<Lesson | null>;

  abstract remove(id: Lesson['id']): Promise<void>;
}
