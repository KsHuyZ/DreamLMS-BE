import { CartItemEntity } from '../../../../../cart-items/infrastructure/persistence/relational/entities/cart-item.entity';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { Cart } from '../../../../domain/cart';
import { CartEntity } from '../entities/cart.entity';

export class CartMapper {
  static toDomain(raw: CartEntity): Cart {
    const domainEntity = new Cart();
    domainEntity.id = raw.id;
    domainEntity.user = raw.user;
    domainEntity.cartItems = raw.cartItems;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Cart): CartEntity {
    const persistenceEntity = new CartEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    const userEntity = new UserEntity();
    userEntity.id = domainEntity.user.id;
    persistenceEntity.user = userEntity;

    if (domainEntity.cartItems && domainEntity.cartItems.length) {
      persistenceEntity.cartItems = domainEntity.cartItems.map((cartItem) => {
        const entity = new CartItemEntity();
        entity.id = cartItem.id;
        return entity;
      });
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
