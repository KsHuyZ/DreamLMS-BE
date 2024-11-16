import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { Quiz } from '../../domain/quiz';

export abstract class QuizRepository {
  abstract create(
    data: Omit<
      Quiz,
      'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'disabled' | 'questions'
    >,
  ): Promise<Quiz>;

  abstract findById(id: Quiz['id']): Promise<NullableType<Quiz>>;

  abstract update(
    id: Quiz['id'],
    payload: DeepPartial<Quiz>,
  ): Promise<Quiz | null>;

  abstract remove(id: Quiz['id']): Promise<void>;
}
