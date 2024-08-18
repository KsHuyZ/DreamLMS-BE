import { Injectable } from '@nestjs/common';
import { NullableType } from '../utils/types/nullable.type';
import { DeepPartial } from '../utils/types/deep-partial.type';
import { Lesson } from './domain/lesson';
import { LessonRepository } from './persistence/lesson.repository';
import { CreateLessonDto } from './dto/create-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(private readonly lessonRepository: LessonRepository) {}

  async create(createLessonDto: CreateLessonDto): Promise<Lesson> {
    return this.lessonRepository.create(createLessonDto);
  }

  async findByCourseId(id: string): Promise<Lesson[]> {
    return this.lessonRepository.findByCourseId(id);
  }

  async findById(id: Lesson['id']): Promise<NullableType<Lesson>> {
    return this.lessonRepository.findById(id);
  }

  async update(
    id: Lesson['id'],
    payload: DeepPartial<Lesson>,
  ): Promise<Lesson | null> {
    return this.lessonRepository.update(id, payload);
  }

  async remove(id: Lesson['id']): Promise<void> {
    await this.lessonRepository.remove(id);
  }
}
