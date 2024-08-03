import { Injectable } from '@nestjs/common';
import { CreateCourseRelatedDto } from './dto/create-course-related.dto';
import { NullableType } from '../utils/types/nullable.type';
import { RelatedCourseRepository } from './infrastructure/persistence/related-course.repository';
import { RelatedCourse } from './domain/related-course';

@Injectable()
export class UsersService {
  constructor(
    private readonly relatedCoursesRepository: RelatedCourseRepository,
  ) {}

  async insertRelatedCourse(
    createRelatedCourseDto: CreateCourseRelatedDto[],
  ): Promise<RelatedCourse[]> {
    return this.relatedCoursesRepository.insertRelatedCourses(
      createRelatedCourseDto,
    );
  }

  findById(id: RelatedCourse['id']): Promise<NullableType<RelatedCourse>> {
    return this.relatedCoursesRepository.findById(id);
  }

  async remove(id: RelatedCourse['id']): Promise<void> {
    await this.relatedCoursesRepository.remove(id);
  }
}
