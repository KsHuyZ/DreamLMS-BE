import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { CartItem } from '../../domain/cart-item';

export abstract class CartItemRepository {
  abstract create(
    data: Omit<CartItem, 'id' | 'createdAt' | 'updatedAt' | 'isEnrolled'>,
  ): Promise<CartItem>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<CartItem[]>;

  abstract findById(id: CartItem['id']): Promise<NullableType<CartItem>>;

  abstract update(
    id: CartItem['id'],
    payload: DeepPartial<CartItem>,
  ): Promise<CartItem | null>;

  abstract remove(id: CartItem['id']): Promise<void>;

  abstract enrollCourses(courseIds: string[]): Promise<void>;
}
