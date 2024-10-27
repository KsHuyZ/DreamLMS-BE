import { Injectable } from '@nestjs/common';

import { NullableType } from '../../../../../utils/types/nullable.type';
import {
  FilterCourseDto,
  SortCourseDto,
} from '../../../../dto/query-course.dto';
import { Course } from '../../../../domain/course';
import { CourseRepository } from '../../course.repository';
import { CourseEntity } from '../entities/course.entity';
import { CourseMapper } from '../mappers/course.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { infinityPagination } from '../../../../../utils/infinity-pagination';
import { InfinityPaginationResponseDto } from '../../../../../utils/dto/infinity-pagination-response.dto';

@Injectable()
export class CoursesRelationalRepository implements CourseRepository {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly coursesRepository: Repository<CourseEntity>,
  ) {}

  async create(data: Course): Promise<Course> {
    const persistenceModel = CourseMapper.toPersistence(data);
    const createdCourse = await this.coursesRepository.save(
      this.coursesRepository.create(persistenceModel),
    );
    const newEntity = await createdCourse.save();
    return CourseMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
    sortOptions,
    paginationOptions,
    userId,
  }: {
    sortOptions?: SortCourseDto[] | null;
    paginationOptions: IPaginationOptions;
    userId?: string;
  }): Promise<InfinityPaginationResponseDto<Course>> {
    console.log({ userId });
    const where: FindOptionsWhere<CourseEntity> = {};
    const [coursesEntity, total] = await this.coursesRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });
    const data = coursesEntity.map((course) => CourseMapper.toDomain(course));

    return infinityPagination(data, {
      ...paginationOptions,
      total,
    });
  }

  async findManyByTeacherWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    teacherId,
  }: {
    filterOptions?: FilterCourseDto | null;
    sortOptions?: SortCourseDto[] | null;
    paginationOptions: IPaginationOptions;
    teacherId: string;
  }): Promise<InfinityPaginationResponseDto<Course>> {
    const createdBy = new UserEntity();
    createdBy.id = teacherId;
    const where: FindOptionsWhere<CourseEntity> = {
      ...filterOptions,
      createdBy,
    };
    const [coursesEntity, total] = await this.coursesRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      relations: ['tags', 'categories', 'createdBy', 'image'],
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });

    const data = coursesEntity.map((course) => CourseMapper.toDomain(course));

    return infinityPagination(data, {
      ...paginationOptions,
      total,
    });
  }

  async findById(id: Course['id']): Promise<NullableType<Course>> {
    const entity = await this.coursesRepository.findOne({
      where: { id },
      relations: ['tags', 'categories', 'image'],
    });
    return entity ? CourseMapper.toDomain(entity) : null;
  }

  async update(
    id: Course['id'],
    payload: Partial<Course>,
  ): Promise<Course | null> {
    const entity = await this.coursesRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Course not found');
    }

    const updatedEntity = await this.coursesRepository.save(
      this.coursesRepository.create(
        CourseMapper.toPersistence({
          ...CourseMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return CourseMapper.toDomain(updatedEntity);
  }

  async remove(id: Course['id']): Promise<void> {
    await this.coursesRepository.softDelete(id);
  }
}
