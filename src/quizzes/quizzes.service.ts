import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { QuizRepository } from './infrastructure/persistence/quiz.repository';
import { Quiz } from './domain/quiz';

@Injectable()
export class QuizzesService {
  constructor(private readonly quizRepository: QuizRepository) {}

  create(createQuizDto: CreateQuizDto) {
    return this.quizRepository.create(createQuizDto);
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
