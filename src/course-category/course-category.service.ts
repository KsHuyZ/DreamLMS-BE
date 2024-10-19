import { Injectable } from '@nestjs/common';
import { NullableType } from '../utils/types/nullable.type';
import { UpdateCourseCategoryDto } from './dto/update-course-category.dto';
import { CourseCategoryRepository } from './infrastructure/persistence/relational/course-category.repository';
import { CreateCourseCategoryDto } from './dto/create-course-category.dto';
import { CourseCategory } from './domain/course-category';
@Injectable()
export class CoursesCategoryService {
  constructor(
    private readonly courseCategoryRepository: CourseCategoryRepository,
  ) {}

  create(data: CreateCourseCategoryDto): Promise<CourseCategory> {
    return this.courseCategoryRepository.create(data);
  }

  createMany(data: CreateCourseCategoryDto[]): Promise<CourseCategory[]> {
    return this.courseCategoryRepository.createMany(data);
  }

  findById(id: CourseCategory['id']): Promise<NullableType<CourseCategory>> {
    return this.courseCategoryRepository.findById(id);
  }

  update(
    id: CourseCategory['id'],
    payload: UpdateCourseCategoryDto,
  ): Promise<CourseCategory | null> {
    return this.courseCategoryRepository.update(id, payload);
  }

  async remove(id: CourseCategory['id']): Promise<void> {
    await this.courseCategoryRepository.remove(id);
  }
}
