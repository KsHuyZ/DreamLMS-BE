import { Answer } from '../../../answers/domain/answer';
import { Question } from '../../../questions/domain/question';
import { Quiz } from '../../../quizzes/domain/quiz';
import { UserQuiz } from '../../../user-quizzes/domain/user-quiz';
import { User } from '../../../users/domain/user';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { UserQuizAnswer } from '../../domain/user-quiz-answer';

export abstract class UserQuizAnswerRepository {
  abstract create(
    data: Omit<UserQuizAnswer, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<UserQuizAnswer>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<UserQuizAnswer[]>;

  abstract findById(
    id: UserQuizAnswer['id'],
  ): Promise<NullableType<UserQuizAnswer>>;

  abstract update(
    id: UserQuizAnswer['id'],
    payload: DeepPartial<UserQuizAnswer>,
  ): Promise<UserQuizAnswer | null>;

  abstract remove(id: UserQuizAnswer['id']): Promise<void>;

  abstract findByUserIdAndQuizId(
    userId: User['id'],
    quizId: Quiz['id'],
  ): Promise<UserQuizAnswer[]>;

  abstract createMany(
    quizzes: { question: Question; answer: Answer; userQuiz: UserQuiz }[],
  ): Promise<UserQuizAnswer[]>;
}
