import { Injectable } from '@nestjs/common';
import { NullableType } from '../utils/types/nullable.type';
import { DeepPartial } from '../utils/types/deep-partial.type';
import { Category } from './domain/category';
import { CategoryRepository } from './persistence/category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto & { image: Express.Multer.File },
  ): Promise<Category> {
    const imagePayload = createCategoryDto.image;
    const imageResponse =
      await this.cloudinaryService.uploadImage(imagePayload);
    if (imageResponse.http_code) throw new Error('Something went wrong!');
    return this.categoryRepository.create({
      ...createCategoryDto,
      image: imageResponse.url,
    });
  }

  findTopCategory(): Promise<Category[]> {
    return this.categoryRepository.findTopCategory();
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

  findAll(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }
}
