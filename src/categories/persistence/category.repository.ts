import { DeepPartial } from '../../utils/types/deep-partial.type';
import { NullableType } from '../../utils/types/nullable.type';
import { Category } from '../domain/category';

export abstract class CategoryRepository {
  abstract createMany(data: Omit<Category, 'id'>[]): Promise<Category[]>;

  abstract findById(id: Category['id']): Promise<NullableType<Category>>;

  abstract findByName(name: string): Promise<Category[]>;

  abstract findManyByIds(ids: Category['id'][]): Promise<Category[]>;

  abstract update(
    id: Category['id'],
    payload: DeepPartial<Category>,
  ): Promise<Category | null>;

  abstract remove(id: Category['id']): Promise<void>;
}
