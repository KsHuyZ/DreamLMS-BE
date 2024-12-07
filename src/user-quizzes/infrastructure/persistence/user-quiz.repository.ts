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
}
