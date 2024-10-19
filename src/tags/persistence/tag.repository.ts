import { DeepPartial } from '../../utils/types/deep-partial.type';
import { NullableType } from '../../utils/types/nullable.type';
import { Tag } from '../domain/tag';

export abstract class TagRepository {
  abstract create(data: Omit<Tag, 'id'>[]): Promise<Tag[]>;

  abstract findById(id: Tag['id']): Promise<NullableType<Tag>>;

  abstract findManyByIds(ids: Tag['id'][]): Promise<Tag[]>;

  abstract findByName(name: string): Promise<Tag[]>;

  abstract update(
    id: Tag['id'],
    payload: DeepPartial<Tag>,
  ): Promise<Tag | null>;

  abstract remove(id: Tag['id']): Promise<void>;
}
