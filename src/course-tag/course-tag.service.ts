import { Injectable } from '@nestjs/common';
import { NullableType } from '../utils/types/nullable.type';
import { UpdateCourseTagDto } from './dto/update-course-tag.dto';
import { CourseTagRepository } from './infrastructure/persistence/relational/course-tag.repository';
import { CreateCourseTagDto } from './dto/create-course-tag.dto';
import { CourseTag } from './domain/course-tag';
@Injectable()
export class CoursesTagService {
  constructor(private readonly courseTagRepository: CourseTagRepository) {}

  async create(createCourseTagDto: CreateCourseTagDto): Promise<CourseTag> {
    return this.courseTagRepository.create(createCourseTagDto);
  }

  createMany(data: CreateCourseTagDto[]): Promise<CourseTag[]> {
    return this.courseTagRepository.createMany(data);
  }

  findById(id: CourseTag['id']): Promise<NullableType<CourseTag>> {
    return this.courseTagRepository.findById(id);
  }

  async update(
    id: CourseTag['id'],
    payload: UpdateCourseTagDto,
  ): Promise<CourseTag | null> {
    return this.courseTagRepository.update(id, payload);
  }

  async remove(id: CourseTag['id']): Promise<void> {
    await this.courseTagRepository.remove(id);
  }
}
