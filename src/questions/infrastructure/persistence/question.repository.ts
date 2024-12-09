import { Quiz } from '../../../quizzes/domain/quiz';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { Question } from '../../domain/question';

export abstract class QuestionRepository {
  abstract createMany(
    data: Omit<Question, 'id' | 'createdAt' | 'updatedAt'>[],
  ): Promise<Question[]>;

  abstract findById(id: Question['id']): Promise<NullableType<Question>>;

  abstract update(
    id: Question['id'],
    payload: DeepPartial<Question>,
  ): Promise<Question | null>;

  abstract remove(id: Question['id']): Promise<void>;

  abstract findByQuizId(id: Quiz['id']): Promise<Question[]>;
}
