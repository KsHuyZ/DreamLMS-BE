import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonEntity } from '../entities/lesson.entity';
import { NullableType } from '../../../utils/types/nullable.type';
import { LessonRepository } from '../lesson.repository';
import { LessonMapper } from '../mappers/lesson.mapper';
import { Lesson } from '../../domain/lesson';

@Injectable()
export class LessonRelationalRepository implements LessonRepository {
  constructor(
    @InjectRepository(LessonEntity)
    private readonly lessonRepository: Repository<LessonEntity>,
  ) {}

  async findById(id: Lesson['id']): Promise<NullableType<Lesson>> {
    const entity = await this.lessonRepository.findOne({
      where: {
        id,
      },
    });

    return entity ? LessonMapper.toDomain(entity) : null;
  }

  async findByCourseId(id: string): Promise<Lesson[]> {
    const entities = await this.lessonRepository.find({
      where: {
        course: { id },
      },
    });
    return entities.map((entity) => LessonMapper.toDomain(entity));
  }

  async create(data: Lesson): Promise<Lesson> {
    const persistenceModel = LessonMapper.toPersistence(data);
    return this.lessonRepository.save(
      this.lessonRepository.create(persistenceModel),
    );
  }

  async update(
    id: Lesson['id'],
    payload: Partial<
      Omit<Lesson, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
    >,
  ): Promise<Lesson | null> {
    const entity = await this.lessonRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Lesson not found');
    }

    const updatedEntity = await this.lessonRepository.save(
      this.lessonRepository.create(
        LessonMapper.toPersistence({
          ...LessonMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return LessonMapper.toDomain(updatedEntity);
  }

  async remove(id: Lesson['id']): Promise<void> {
    await this.lessonRepository.softDelete({ id });
  }
}
