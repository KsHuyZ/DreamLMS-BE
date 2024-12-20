import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from '../entities/cart.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Cart } from '../../../../domain/cart';
import { CartRepository } from '../../cart.repository';
import { CartMapper } from '../mappers/cart.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { User } from '../../../../../users/domain/user';

@Injectable()
export class CartRelationalRepository implements CartRepository {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
  ) {}

  async create(data: Cart): Promise<Cart> {
    const persistenceModel = CartMapper.toPersistence(data);
    const newEntity = await this.cartRepository.save(
      this.cartRepository.create(persistenceModel),
    );
    return CartMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Cart[]> {
    const entities = await this.cartRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((user) => CartMapper.toDomain(user));
  }

  async findById(id: Cart['id']): Promise<NullableType<Cart>> {
    const entity = await this.cartRepository.findOne({
      where: {
        id,
      },
      relations: [
        'cartItems.course.image',
        'cartItems.course.createdBy',
        'user',
      ],
    });

    return entity ? CartMapper.toDomain(entity) : null;
  }

  async update(id: Cart['id'], payload: Partial<Cart>): Promise<Cart> {
    const entity = await this.cartRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.cartRepository.save(
      this.cartRepository.create(
        CartMapper.toPersistence({
          ...CartMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return CartMapper.toDomain(updatedEntity);
  }

  async remove(id: Cart['id']): Promise<void> {
    await this.cartRepository.delete(id);
  }
  findByUserId(id: User['id']): Promise<NullableType<Cart>> {
    return this.cartRepository.findOne({
      where: {
        user: {
          id,
        },
      },
      relations: ['cartItems.course.image', 'cartItems.course.createdBy'],
    });
  }
  findCartItemByUserIdAndCourseId(
    userId: User['id'],
    courseId: string,
  ): Promise<NullableType<Cart>> {
    return this.cartRepository.findOne({
      where: {
        user: {
          id: userId,
        },
        cartItems: {
          course: {
            id: courseId,
          },
        },
      },
      relations: ['cartItems.course', 'cartItems.course'],
    });
  }
}
