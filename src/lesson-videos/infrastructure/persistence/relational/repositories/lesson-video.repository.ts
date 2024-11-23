import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonVideoEntity } from '../entities/lesson-video.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { LessonVideo } from '../../../../domain/lesson-video';
import { LessonVideoRepository } from '../../lesson-video.repository';
import { LessonVideoMapper } from '../mappers/lesson-video.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class LessonVideoRelationalRepository implements LessonVideoRepository {
  constructor(
    @InjectRepository(LessonVideoEntity)
    private readonly lessonVideoRepository: Repository<LessonVideoEntity>,
  ) {}

  async create(data: LessonVideo): Promise<LessonVideo> {
    const persistenceModel = LessonVideoMapper.toPersistence(data);
    const newEntity = await this.lessonVideoRepository.save(
      this.lessonVideoRepository.create(persistenceModel),
    );
    return LessonVideoMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<LessonVideo[]> {
    const entities = await this.lessonVideoRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((user) => LessonVideoMapper.toDomain(user));
  }

  async findById(id: LessonVideo['id']): Promise<NullableType<LessonVideo>> {
    const entity = await this.lessonVideoRepository.findOne({
      where: { id },
    });

    return entity ? LessonVideoMapper.toDomain(entity) : null;
  }

  async update(
    id: LessonVideo['id'],
    payload: Partial<LessonVideo>,
  ): Promise<LessonVideo> {
    const entity = await this.lessonVideoRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.lessonVideoRepository.save(
      this.lessonVideoRepository.create(
        LessonVideoMapper.toPersistence({
          ...LessonVideoMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return LessonVideoMapper.toDomain(updatedEntity);
  }

  async remove(id: LessonVideo['id']): Promise<void> {
    await this.lessonVideoRepository.delete(id);
  }
}
