import { Injectable } from '@nestjs/common';
import { NullableType } from '../utils/types/nullable.type';
import { DeepPartial } from '../utils/types/deep-partial.type';
import { Category } from './domain/category';
import { CategoryRepository } from './persistence/category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  createMany(createCategoryDto: CreateCategoryDto[]): Promise<Category[]> {
    return this.categoryRepository.createMany(createCategoryDto);
  }

  findById(id: Category['id']): Promise<NullableType<Category>> {
    return this.categoryRepository.findById(id);
  }

  findManyByIds(id: Category['id'][]): Promise<Category[]> {
    return this.categoryRepository.findManyByIds(id);
  }

  update(
    id: Category['id'],
    payload: DeepPartial<Category>,
  ): Promise<Category | null> {
    return this.categoryRepository.update(id, payload);
  }

  findByName(name: string): Promise<Category[]> {
    return this.categoryRepository.findByName(name);
  }

  async remove(id: Category['id']): Promise<void> {
    await this.categoryRepository.remove(id);
  }
}
