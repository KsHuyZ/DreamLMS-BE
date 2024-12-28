import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { NullableType } from '../../../utils/types/nullable.type';
import { CategoryRepository } from '../category.repository';
import { CategoryMapper } from '../mappers/category.mapper';
import { Category } from '../../domain/category';

@Injectable()
export class TagRelationalRepository implements CategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async findById(id: Category['id']): Promise<NullableType<Category>> {
    const entity = await this.categoryRepository.findOne({
      where: {
        id,
      },
    });

    return entity ? CategoryMapper.toDomain(entity) : null;
  }

  async findByName(name: Category['name']): Promise<Category[]> {
    const entities = await this.categoryRepository.find({
      where: {
        name: ILike(`%${name}%`),
      },
      take: 10,
    });
    return entities.map(CategoryMapper.toDomain);
  }

  async findManyByIds(ids: Category['id'][]): Promise<Category[]> {
    const entities = await this.categoryRepository.findBy({ id: In(ids) });
    return entities.map(CategoryMapper.toDomain);
  }

  createMany(data: Category[]): Promise<Category[]> {
    const persistenceModel = data.map((d) => CategoryMapper.toPersistence(d));
    return this.categoryRepository.save(
      this.categoryRepository.create(persistenceModel),
    );
  }

  async update(
    id: Category['id'],
    payload: Partial<
      Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
    >,
  ): Promise<Category | null> {
    const entity = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Tag not found');
    }

    const updatedEntity = await this.categoryRepository.save(
      this.categoryRepository.create(
        CategoryMapper.toPersistence({
          ...CategoryMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return CategoryMapper.toDomain(updatedEntity);
  }

  async remove(id: Category['id']): Promise<void> {
    await this.categoryRepository.softDelete({ id });
  }
}
