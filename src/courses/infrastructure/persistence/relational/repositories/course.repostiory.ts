import { Injectable } from '@nestjs/common';

import { NullableType } from '../../../../../utils/types/nullable.type';
import { SortCourseDto } from '../../../../dto/query-course.dto';
import { Course } from '../../../../domain/course';
import { CourseRepository } from '../../course.repository';
import { CourseEntity } from '../entities/course.entity';
import { CourseMapper } from '../mappers/course.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

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
  }): Promise<Course[]> {
    const where: FindOptionsWhere<CourseEntity> = {};
    console.log({ userId });
    const coursesObjects = await this.coursesRepository.find({
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

    return coursesObjects.map((courseObjects) =>
      CourseMapper.toDomain(courseObjects),
    );
  }

  async findById(id: Course['id']): Promise<NullableType<Course>> {
    const entity = await this.coursesRepository.findOne({
      where: { id },
      relations: {
        related: true,
      },
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
