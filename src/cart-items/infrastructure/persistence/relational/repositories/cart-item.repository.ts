import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CartItemEntity } from '../entities/cart-item.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { CartItem } from '../../../../domain/cart-item';
import { CartItemRepository } from '../../cart-item.repository';
import { CartItemMapper } from '../mappers/cart-item.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { Course } from '../../../../../courses/domain/course';

@Injectable()
export class CartItemRelationalRepository implements CartItemRepository {
  constructor(
    @InjectRepository(CartItemEntity)
    private readonly cartItemRepository: Repository<CartItemEntity>,
  ) {}

  async create(data: CartItem): Promise<CartItem> {
    const persistenceModel = CartItemMapper.toPersistence(data);
    const newEntity = await this.cartItemRepository.save(
      this.cartItemRepository.create(persistenceModel),
    );
    return CartItemMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<CartItem[]> {
    const entities = await this.cartItemRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((user) => CartItemMapper.toDomain(user));
  }

  async findById(id: CartItem['id']): Promise<NullableType<CartItem>> {
    const entity = await this.cartItemRepository.findOne({
      where: { id },
    });

    return entity ? CartItemMapper.toDomain(entity) : null;
  }

  async update(
    id: CartItem['id'],
    payload: Partial<CartItem>,
  ): Promise<CartItem> {
    const entity = await this.cartItemRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.cartItemRepository.save(
      this.cartItemRepository.create(
        CartItemMapper.toPersistence({
          ...CartItemMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return CartItemMapper.toDomain(updatedEntity);
  }

  async remove(id: CartItem['id']): Promise<void> {
    await this.cartItemRepository.delete(id);
  }

  async enrollCourses(courseIds: Course['id'][]) {
    await this.cartItemRepository.update(
      {
        course: {
          id: In(courseIds),
        },
      },
      {
        isEnrolled: true,
      },
    );
  }
}
