import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { RateEntity } from '../entities/rate.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Rate } from '../../../../domain/rate';
import { RateRepository } from '../../rate.repository';
import { RateMapper } from '../mappers/rate.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { Course } from '../../../../../courses/domain/course';
import { infinityPagination } from '../../../../../utils/infinity-pagination';

@Injectable()
export class RateRelationalRepository implements RateRepository {
  constructor(
    @InjectRepository(RateEntity)
    private readonly rateRepository: Repository<RateEntity>,
  ) {}

  async create(data: Rate): Promise<Rate> {
    const persistenceModel = RateMapper.toPersistence(data);
    const newEntity = await this.rateRepository.save(
      this.rateRepository.create(persistenceModel),
    );
    return RateMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Rate[]> {
    const entities = await this.rateRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((user) => RateMapper.toDomain(user));
  }

  async findByCourseIdWithPagination({
    paginationOptions,
    courseId,
    stars = [1, 2, 3, 4, 5],
  }: {
    paginationOptions: IPaginationOptions;
    courseId: Course['id'];
    userId?: Rate['user']['id'];
    stars?: Rate['star'][];
  }) {
    const [entities, total] = await this.rateRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: { course: { id: courseId }, star: In(stars) },
      relations: ['user'],
    });
    return infinityPagination(entities.map(RateMapper.toDomain), {
      ...paginationOptions,
      total,
    });
  }

  async findById(id: Rate['id']): Promise<NullableType<Rate>> {
    const entity = await this.rateRepository.findOne({
      where: { id },
    });

    return entity ? RateMapper.toDomain(entity) : null;
  }

  async update(id: Rate['id'], payload: Partial<Rate>): Promise<Rate> {
    const entity = await this.rateRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.rateRepository.save(
      this.rateRepository.create(
        RateMapper.toPersistence({
          ...RateMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return RateMapper.toDomain(updatedEntity);
  }

  async remove(id: Rate['id']): Promise<void> {
    await this.rateRepository.delete(id);
  }

  async findByCourseId(courseId: Rate['course']['id']): Promise<Rate[]> {
    const rates = await this.rateRepository.find({
      where: { course: { id: courseId } },
    });
    return rates.map(RateMapper.toDomain);
  }

  async getAvgRateByCourseId(courseId: Rate['course']['id']): Promise<number> {
    const avg = await this.rateRepository.average('star', {
      course: { id: courseId },
    });
    return avg || 0;
  }

  async getRateByCourseIdAndUserId(
    courseId: Rate['course']['id'],
    userId: Rate['user']['id'],
  ): Promise<NullableType<Rate>> {
    const entity = await this.rateRepository.findOne({
      where: { course: { id: courseId }, user: { id: userId } },
      relations: ['user'],
    });

    return entity ? RateMapper.toDomain(entity) : null;
  }
}
