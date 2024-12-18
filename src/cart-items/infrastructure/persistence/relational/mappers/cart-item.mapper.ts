import { CartEntity } from '../../../../../carts/infrastructure/persistence/relational/entities/cart.entity';
import { CourseEntity } from '../../../../../courses/infrastructure/persistence/relational/entities/course.entity';
import { CartItem } from '../../../../domain/cart-item';
import { CartItemEntity } from '../entities/cart-item.entity';

export class CartItemMapper {
  static toDomain(raw: CartItemEntity): CartItem {
    const domainEntity = new CartItem();
    domainEntity.id = raw.id;
    domainEntity.course = raw.course;
    domainEntity.cart = raw.cart;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.isEnrolled = raw.isEnrolled;

    return domainEntity;
  }

  static toPersistence(domainEntity: CartItem): CartItemEntity {
    const persistenceEntity = new CartItemEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    const courseEntity = new CourseEntity();
    courseEntity.id = domainEntity.course.id;
    persistenceEntity.course = courseEntity;
    const cartEntity = new CartEntity();
    cartEntity.id = domainEntity.cart.id;
    persistenceEntity.cart = cartEntity;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.isEnrolled = domainEntity.isEnrolled;
    return persistenceEntity;
  }
}
