import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RelatedCourseEntity } from '../entities/related-course.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { RelatedCourse } from '../../../../domain/related-course';
import { RelatedCourseRepository } from '../../related-course.repository';
import { RelatedCourseMapper } from '../mappers/related-course.mapper';

@Injectable()
export class RelatedCourseRelationalRepository
  implements RelatedCourseRepository
{
  constructor(
    @InjectRepository(RelatedCourseEntity)
    private readonly relatedCoursesRepository: Repository<RelatedCourseEntity>,
  ) {}

  async create(data: RelatedCourse): Promise<RelatedCourse> {
    const persistenceModel = RelatedCourseMapper.toPersistence(data);
    const newEntity = await this.relatedCoursesRepository.save(
      this.relatedCoursesRepository.create(persistenceModel),
    );
    return RelatedCourseMapper.toDomain(newEntity);
  }

  async insertRelatedCourses(
    relatedCourses: RelatedCourse[],
  ): Promise<RelatedCourse[]> {
    const relatedCoursesEntity = relatedCourses.map((relatedCourse) =>
      RelatedCourseMapper.toPersistence(relatedCourse),
    );
    const newRelatedCoursesEntity =
      this.relatedCoursesRepository.create(relatedCoursesEntity);
    await this.relatedCoursesRepository.insert(newRelatedCoursesEntity);
    return newRelatedCoursesEntity.map((relatedCourseEntity) =>
      RelatedCourseMapper.toDomain(relatedCourseEntity),
    );
  }

  async findById(
    id: RelatedCourse['id'],
  ): Promise<NullableType<RelatedCourse>> {
    const entity = await this.relatedCoursesRepository.findOne({
      where: { id },
    });

    return entity ? RelatedCourseMapper.toDomain(entity) : null;
  }

  async findByCourseId(
    courseId: RelatedCourse['courseId'],
  ): Promise<NullableType<RelatedCourse[]>> {
    if (!courseId) return [];

    const relatedCourses = await this.relatedCoursesRepository.find({
      where: { courseId },
    });

    return relatedCourses
      ? relatedCourses.map((relatedCourse) =>
          RelatedCourseMapper.toDomain(relatedCourse),
        )
      : ([] as RelatedCourse[]);
  }

  async remove(id: RelatedCourse['id']): Promise<void> {
    await this.relatedCoursesRepository.softDelete(id);
  }
}
