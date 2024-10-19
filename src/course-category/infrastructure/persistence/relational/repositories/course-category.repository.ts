import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { CourseCategoryRepository } from '../course-category.repository';
import { CourseCategoryMapper } from '../mappers/course-category.mapper';
import { CourseCategoryEntity } from '../entities/course-category.entity';
import { CourseCategory } from '../../../../domain/course-category';

@Injectable()
export class CourseTagRelationalRepository implements CourseCategoryRepository {
  constructor(
    @InjectRepository(CourseCategoryEntity)
    private readonly courseTagRepository: Repository<CourseCategoryEntity>,
  ) {}

  async findById(
    id: CourseCategory['id'],
  ): Promise<NullableType<CourseCategory>> {
    const entity = await this.courseTagRepository.findOne({
      where: {
        id,
      },
    });

    return entity ? CourseCategoryMapper.toDomain(entity) : null;
  }

  async create(data: CourseCategory): Promise<CourseCategory> {
    const persistenceModel = CourseCategoryMapper.toPersistence(data);
    const createdCourse = await this.courseTagRepository.save(
      this.courseTagRepository.create(persistenceModel),
    );
    const newEntity = await createdCourse.save();
    return CourseCategoryMapper.toDomain(newEntity);
  }

  async createMany(data: CourseCategory[]): Promise<CourseCategory[]> {
    const persistenceModel = data.map((d) =>
      CourseCategoryMapper.toPersistence(d),
    );
    const result = await this.courseTagRepository.save(
      this.courseTagRepository.create(persistenceModel),
    );
    return result.map((r) => CourseCategoryMapper.toDomain(r));
  }

  async update(
    id: CourseCategory['id'],
    payload: Partial<
      Omit<CourseCategory, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
    >,
  ): Promise<CourseCategory | null> {
    const entity = await this.courseTagRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Tag not found');
    }

    const updatedEntity = await this.courseTagRepository.save(
      this.courseTagRepository.create(
        CourseCategoryMapper.toPersistence({
          ...CourseCategoryMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return CourseCategoryMapper.toDomain(updatedEntity);
  }

  async remove(id: CourseCategory['id']): Promise<void> {
    await this.courseTagRepository.softDelete({ id });
  }
}
