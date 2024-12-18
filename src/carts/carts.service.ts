import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartRepository } from './infrastructure/persistence/cart.repository';
import { Cart } from './domain/cart';
import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';
import { PaymentsService } from '../payments/payments.service';

@Injectable()
export class CartsService {
  constructor(
    private readonly cartRepository: CartRepository,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly paymentsService: PaymentsService,
  ) {}

  async create(createCartDto: CreateCartDto) {
    const { userId } = createCartDto;
    const user = await this.usersService.findById(userId);
    if (!user) throw new BadRequestException('User not found');
    return this.cartRepository.create({ user });
  }

  async findOne(id: Cart['id']) {
    const cart = await this.cartRepository.findById(id);
    const cartItems =
      cart?.cartItems.filter((cartItem) => !cartItem.isEnrolled) || [];
    return cart ? { ...cart, cartItems } : null;
  }

  async findByUserId(userId: User['id']) {
    const cart = await this.cartRepository.findByUserId(userId);
    const cartItems =
      cart?.cartItems.filter((cartItem) => !cartItem.isEnrolled) || [];
    return cart ? { ...cart, cartItems } : null;
  }

  async update(id: Cart['id'], updateCartDto: UpdateCartDto) {
    const { userId } = updateCartDto;
    const user = await this.usersService.findById(userId || '');
    if (!user) throw new BadRequestException('User not found');
    return this.cartRepository.update(id, { user });
  }

  remove(id: Cart['id']) {
    return this.cartRepository.remove(id);
  }

  async payCart(userId: User['id']) {
    const cart = await this.cartRepository.findByUserId(userId);
    if (!cart) throw new BadRequestException('Cart not found');
    const cartId = cart.id;
    const amount = cart.cartItems.reduce(
      (current, cartItem) => cartItem.course.price + current,
      0,
    );
    return this.paymentsService.createPaymentCartIntent(cartId, amount);
  }
}
