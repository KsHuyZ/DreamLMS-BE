import { Injectable } from '@nestjs/common';
import { CreateUserQuizDto } from './dto/create-user-quiz.dto';
import { UpdateUserQuizDto } from './dto/update-user-quiz.dto';
import { UserQuizRepository } from './infrastructure/persistence/user-quiz.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { UserQuiz } from './domain/user-quiz';

@Injectable()
export class UserQuizzesService {
  constructor(private readonly user_quizRepository: UserQuizRepository) {}

  create(createUserQuizDto: CreateUserQuizDto) {
    return this.user_quizRepository.create(createUserQuizDto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.user_quizRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: UserQuiz['id']) {
    return this.user_quizRepository.findById(id);
  }

  update(id: UserQuiz['id'], updateUserQuizDto: UpdateUserQuizDto) {
    return this.user_quizRepository.update(id, updateUserQuizDto);
  }

  remove(id: UserQuiz['id']) {
    return this.user_quizRepository.remove(id);
  }
}
