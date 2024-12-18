import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartItemRepository } from './infrastructure/persistence/cart-item.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { CartItem } from './domain/cart-item';
import { CartsService } from '../carts/carts.service';
import { CoursesService } from '../courses/courses.service';
import { Course } from '../courses/domain/course';

@Injectable()
export class CartItemsService {
  constructor(
    private readonly cartItemRepository: CartItemRepository,
    private readonly cartsService: CartsService,
    private readonly coursesService: CoursesService,
  ) {}

  async create(createCartItemDto: CreateCartItemDto) {
    const { userId, courseId } = createCartItemDto;
    const cart = await this.cartsService.findByUserId(userId);
    if (!cart) throw new BadRequestException('Cart not found');
    const course = await this.coursesService.findById(courseId);
    if (!course) throw new BadRequestException('Course not found');
    return this.cartItemRepository.create({ course, cart });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.cartItemRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: CartItem['id']) {
    return this.cartItemRepository.findById(id);
  }

  async update(id: CartItem['id'], updateCartItemDto: UpdateCartItemDto) {
    const { courseId } = updateCartItemDto;
    const course =
      (await this.coursesService.findById(courseId || '')) ?? undefined;

    return this.cartItemRepository.update(id, { course });
  }

  remove(id: CartItem['id']) {
    return this.cartItemRepository.remove(id);
  }

  enrollCourses(courseIds: Course['id'][]) {
    return this.cartItemRepository.enrollCourses(courseIds);
  }
}
