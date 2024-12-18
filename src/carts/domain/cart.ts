import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';
import { CartItem } from '../../cart-items/domain/cart-item';

export class Cart {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  user: User;

  @ApiProperty()
  cartItems: CartItem[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
