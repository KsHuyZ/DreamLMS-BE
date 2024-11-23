import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseVideoEntity } from '../entities/course-video.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { CourseVideo } from '../../../../domain/course-video';
import { CourseVideoRepository } from '../../course-video.repository';
import { CourseVideoMapper } from '../mappers/course-video.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class CourseVideoRelationalRepository implements CourseVideoRepository {
  constructor(
    @InjectRepository(CourseVideoEntity)
    private readonly courseVideoRepository: Repository<CourseVideoEntity>,
  ) {}

  async create(data: CourseVideo): Promise<CourseVideo> {
    const persistenceModel = CourseVideoMapper.toPersistence(data);
    const newEntity = await this.courseVideoRepository.save(
      this.courseVideoRepository.create(persistenceModel),
    );
    return CourseVideoMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<CourseVideo[]> {
    const entities = await this.courseVideoRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((user) => CourseVideoMapper.toDomain(user));
  }

  async findById(id: CourseVideo['id']): Promise<NullableType<CourseVideo>> {
    const entity = await this.courseVideoRepository.findOne({
      where: { id },
    });

    return entity ? CourseVideoMapper.toDomain(entity) : null;
  }

  async update(
    id: CourseVideo['id'],
    payload: Partial<CourseVideo>,
  ): Promise<CourseVideo> {
    const entity = await this.courseVideoRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.courseVideoRepository.save(
      this.courseVideoRepository.create(
        CourseVideoMapper.toPersistence({
          ...CourseVideoMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return CourseVideoMapper.toDomain(updatedEntity);
  }

  async remove(id: CourseVideo['id']): Promise<void> {
    await this.courseVideoRepository.delete(id);
  }
}
