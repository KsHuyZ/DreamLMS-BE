import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CoursesService } from '../courses/courses.service';
import { EnrollsService } from '../enrolls/enrolls.service';
import { User } from '../users/domain/user';
import { Plan } from '../storage/types/plan.enum';
import { StoragesService } from '../storage/storage.service';
import { CartsService } from '../carts/carts.service';
import { CartItemsService } from '../cart-items/cart-items.service';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class StripeService {
  constructor(
    private readonly usersService: UsersService,
    private readonly coursesService: CoursesService,
    private readonly enrollsService: EnrollsService,
    private readonly storagesService: StoragesService,
    private readonly cartsService: CartsService,
    private readonly cartItemsService: CartItemsService,
  ) {}
  async paymentCourseSuccess(courseId: string, userId: string) {
    const course = await this.coursesService.findById(courseId);
    if (!course) return;
    const user = await this.usersService.findById(userId);
    if (!user) return;
    const existEnroll = await this.enrollsService.findByCourseAndUserId(
      userId,
      courseId,
    );
    if (existEnroll) return;
    return this.enrollsService.enrollCourse({ course, user });
  }

  async upgradePlans(userId: User['id'], plan: Plan) {
    const user = await this.usersService.findById(userId);
    if (!user) return;
    return this.storagesService.upgradePlan(userId, plan);
  }

  @Transactional()
  async payCartSuccess(cartId: string) {
    const cart = await this.cartsService.findOne(cartId);
    if (!cart) return;
    const courseIds = cart.cartItems.map((cartItem) => cartItem.course.id);

    const enrollPayload = cart.cartItems.map((cartItem) => ({
      course: cartItem.course,
      user: cart.user,
    }));
    await this.cartItemsService.enrollCourses(courseIds);
    return this.enrollsService.enrollCourses(enrollPayload);
  }
}
