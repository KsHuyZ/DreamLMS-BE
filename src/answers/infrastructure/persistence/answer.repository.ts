import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { Answer } from '../../domain/answer';

export abstract class AnswerRepository {
  abstract createMany(
    data: Omit<Answer, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>[],
  ): Promise<Answer[]>;

  abstract findById(id: Answer['id']): Promise<NullableType<Answer>>;

  abstract update(
    id: Answer['id'],
    payload: DeepPartial<Answer>,
  ): Promise<Answer | null>;

  abstract remove(id: Answer['id']): Promise<void>;
}
