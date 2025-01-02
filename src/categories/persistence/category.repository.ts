import { DeepPartial } from '../../utils/types/deep-partial.type';
import { NullableType } from '../../utils/types/nullable.type';
import { Category } from '../domain/category';

export abstract class CategoryRepository {
  abstract createMany(
    data: Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>[],
  ): Promise<Category[]>;

  abstract findTopCategory(): Promise<Category[]>;

  abstract create(
    data: Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<Category>;

  abstract findById(id: Category['id']): Promise<NullableType<Category>>;

  abstract findByName(name: string): Promise<Category[]>;

  abstract findAll(): Promise<Category[]>;

  abstract findManyByIds(ids: Category['id'][]): Promise<Category[]>;

  abstract update(
    id: Category['id'],
    payload: DeepPartial<Category>,
  ): Promise<Category | null>;

  abstract remove(id: Category['id']): Promise<void>;
}
