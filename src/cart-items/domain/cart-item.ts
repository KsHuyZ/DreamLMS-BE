import { ApiProperty } from '@nestjs/swagger';
import { Course } from '../../courses/domain/course';
import { Cart } from '../../carts/domain/cart';

export class CartItem {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  course: Course;

  @ApiProperty()
  cart: Cart;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  isEnrolled: boolean;
}
