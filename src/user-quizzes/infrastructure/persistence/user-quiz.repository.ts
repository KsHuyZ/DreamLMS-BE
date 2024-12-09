import { Course } from '../../../courses/domain/course';
import { Quiz } from '../../../quizzes/domain/quiz';
import { User } from '../../../users/domain/user';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { UserQuiz } from '../../domain/user-quiz';

export abstract class UserQuizRepository {
  abstract create(
    data: Omit<UserQuiz, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<UserQuiz>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<UserQuiz[]>;

  abstract findById(id: UserQuiz['id']): Promise<NullableType<UserQuiz>>;

  abstract update(
    id: UserQuiz['id'],
    payload: DeepPartial<UserQuiz>,
  ): Promise<UserQuiz | null>;

  abstract remove(id: UserQuiz['id']): Promise<void>;

  abstract findByUserIdAndQuizId(
    userId: User['id'],
    quizId: Quiz['id'],
  ): Promise<NullableType<UserQuiz>>;

  abstract findByUserIdAndCourseId(
    userId: User['id'],
    courseId: Course['id'],
  ): Promise<UserQuiz[]>;

  abstract countByUserIdAndCourseId(
    userId: User['id'],
    courseId: Course['id'],
  ): Promise<number>;
}
