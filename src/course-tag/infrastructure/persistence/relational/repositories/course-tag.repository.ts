import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { CourseTag } from '../../../../domain/course-tag';
import { CourseTagEntity } from '../entities/course-category.entity';
import { CourseTagRepository } from '../course-tag.repository';
import { CourseTagMapper } from '../mappers/course-tag.mapper';

@Injectable()
export class CourseTagRelationalRepository implements CourseTagRepository {
  constructor(
    @InjectRepository(CourseTagEntity)
    private readonly courseTagRepository: Repository<CourseTagEntity>,
  ) {}

  async findById(id: CourseTag['id']): Promise<NullableType<CourseTag>> {
    const entity = await this.courseTagRepository.findOne({
      where: {
        id,
      },
    });

    return entity ? CourseTagMapper.toDomain(entity) : null;
  }

  async create(data: CourseTag): Promise<CourseTag> {
    const persistenceModel = CourseTagMapper.toPersistence(data);
    const createdCourse = await this.courseTagRepository.save(
      this.courseTagRepository.create(persistenceModel),
    );
    const newEntity = await createdCourse.save();
    return CourseTagMapper.toDomain(newEntity);
  }

  async createMany(data: CourseTag[]): Promise<CourseTag[]> {
    const persistenceModel = data.map((d) => CourseTagMapper.toPersistence(d));
    const result = await this.courseTagRepository.save(
      this.courseTagRepository.create(persistenceModel),
    );
    return result.map((r) => CourseTagMapper.toDomain(r));
  }

  async update(
    id: CourseTag['id'],
    payload: Partial<
      Omit<CourseTag, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
    >,
  ): Promise<CourseTag | null> {
    const entity = await this.courseTagRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Tag not found');
    }

    const updatedEntity = await this.courseTagRepository.save(
      this.courseTagRepository.create(
        CourseTagMapper.toPersistence({
          ...CourseTagMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return CourseTagMapper.toDomain(updatedEntity);
  }

  async remove(id: CourseTag['id']): Promise<void> {
    await this.courseTagRepository.softDelete({ id });
  }
}
