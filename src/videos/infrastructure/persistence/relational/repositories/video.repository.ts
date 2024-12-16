import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VideoEntity } from '../entities/video.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Video } from '../../../../domain/video';
import { VideoRepository } from '../../video.repository';
import { VideoMapper } from '../mappers/video.mapper';
import { User } from '../../../../../users/domain/user';

@Injectable()
export class VideoRelationalRepository implements VideoRepository {
  constructor(
    @InjectRepository(VideoEntity)
    private readonly videoRepository: Repository<VideoEntity>,
  ) {}

  async create(data: Video): Promise<Video> {
    const persistenceModel = VideoMapper.toPersistence(data);
    const newEntity = await this.videoRepository.save(
      this.videoRepository.create(persistenceModel),
    );
    return VideoMapper.toDomain(newEntity);
  }

  async findAllByLessonId({
    lessonId,
  }: {
    lessonId: string;
  }): Promise<Video[]> {
    const entities = await this.videoRepository.find({
      where: {
        id: lessonId,
      },
    });

    return entities.map((user) => VideoMapper.toDomain(user));
  }

  async findById(id: Video['id']): Promise<NullableType<Video>> {
    const entity = await this.videoRepository.findOne({
      where: { id },
    });

    return entity ? VideoMapper.toDomain(entity) : null;
  }

  async update(id: Video['id'], payload: Partial<Video>): Promise<Video> {
    const entity = await this.videoRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.videoRepository.save(
      this.videoRepository.create(
        VideoMapper.toPersistence({
          ...VideoMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return VideoMapper.toDomain(updatedEntity);
  }

  async remove(id: Video['id']): Promise<void> {
    await this.videoRepository.delete(id);
  }
  getTotalSize(userId: User['id']): Promise<NullableType<number>> {
    return this.videoRepository.sum('size', {
      createdBy: {
        id: userId,
      },
    });
  }
}
