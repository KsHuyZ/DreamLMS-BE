import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { QuizRepository } from './infrastructure/persistence/quiz.repository';
import { Quiz } from './domain/quiz';
import { LessonRepository } from '../lessons/persistence/lesson.repository';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class QuizzesService {
  constructor(
    private readonly quizRepository: QuizRepository,
    private readonly lessonRepository: LessonRepository,
  ) {}

  @Transactional()
  async create(createQuizDto: CreateQuizDto) {
    const { lessonId } = createQuizDto;
    const lesson = await this.lessonRepository.findById(lessonId);
    if (!lesson) {
      throw new BadRequestException('Lesson not found');
    }
    const lastVideoOrder =
      lesson.videos.length > 0
        ? lesson.videos[lesson.videos.length - 1].order
        : 0;
    const lastQuizOrder =
      lesson.quizzes.length > 0
        ? lesson.quizzes[lesson.quizzes.length - 1].order
        : 0;
    const newOrder =
      lastVideoOrder > lastQuizOrder ? lastVideoOrder : lastQuizOrder;
    return this.quizRepository.create({
      ...createQuizDto,
      order: newOrder + 1,
      lesson,
    });
  }

  findOne(id: Quiz['id']) {
    return this.quizRepository.findById(id);
  }

  update(id: Quiz['id'], updatequizDto: UpdateQuizDto) {
    return this.quizRepository.update(id, updatequizDto);
  }

  remove(id: Quiz['id']) {
    return this.quizRepository.remove(id);
  }
}
