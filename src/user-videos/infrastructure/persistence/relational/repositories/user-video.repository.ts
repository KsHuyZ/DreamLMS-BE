import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserVideoEntity } from '../entities/user-video.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { UserVideo } from '../../../../domain/user-video';
import { UserVideoRepository } from '../../user-video.repository';
import { UserVideoMapper } from '../mappers/user-video.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { LessonVideo } from '../../../../../lesson-videos/domain/lesson-video';
import { User } from '../../../../../users/domain/user';
import { Course } from '../../../../../courses/domain/course';

@Injectable()
export class UserVideoRelationalRepository implements UserVideoRepository {
  constructor(
    @InjectRepository(UserVideoEntity)
    private readonly userVideoRepository: Repository<UserVideoEntity>,
  ) {}

  async create(data: UserVideo): Promise<UserVideo> {
    const persistenceModel = UserVideoMapper.toPersistence(data);
    const newEntity = await this.userVideoRepository.save(
      this.userVideoRepository.create(persistenceModel),
    );
    return UserVideoMapper.toDomain(newEntity);
  }
  async findByUserIdAndVideoId(
    userId: User['id'],
    videoId: LessonVideo['id'],
  ): Promise<NullableType<UserVideo>> {
    const entity = await this.userVideoRepository.findOne({
      where: {
        user: {
          id: userId,
        },
        video: {
          id: videoId,
        },
      },
    });
    return entity ? UserVideoMapper.toDomain(entity) : null;
  }
  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<UserVideo[]> {
    const entities = await this.userVideoRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((user) => UserVideoMapper.toDomain(user));
  }

  async findById(id: UserVideo['id']): Promise<NullableType<UserVideo>> {
    const entity = await this.userVideoRepository.findOne({
      where: { id },
    });

    return entity ? UserVideoMapper.toDomain(entity) : null;
  }

  async update(
    id: UserVideo['id'],
    payload: Partial<UserVideo>,
  ): Promise<UserVideo> {
    const entity = await this.userVideoRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.userVideoRepository.save(
      this.userVideoRepository.create(
        UserVideoMapper.toPersistence({
          ...UserVideoMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return UserVideoMapper.toDomain(updatedEntity);
  }

  async remove(id: UserVideo['id']): Promise<void> {
    await this.userVideoRepository.delete(id);
  }
  countByUserIdAndCourseId(
    userId: User['id'],
    courseId: Course['id'],
  ): Promise<number> {
    return this.userVideoRepository.count({
      where: {
        user: {
          id: userId,
        },
        video: {
          lesson: {
            course: {
              id: courseId,
            },
          },
        },
      },
    });
  }

  findByUserIdAndCourseId(
    userId: User['id'],
    courseId: Course['id'],
  ): Promise<UserVideo[]> {
    return this.userVideoRepository.find({
      where: {
        user: {
          id: userId,
        },
        video: {
          lesson: {
            course: {
              id: courseId,
            },
          },
        },
      },
      relations: ['video'],
    });
  }
}
