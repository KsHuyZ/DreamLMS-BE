import { Injectable } from '@nestjs/common';
import { CreateUserQuizAnswerDto } from './dto/create-user-quiz-answer.dto';
import { UpdateUserQuizAnswerDto } from './dto/update-user-quiz-answer.dto';
import { UserQuizAnswerRepository } from './infrastructure/persistence/user-quiz-answer.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { UserQuizAnswer } from './domain/user-quiz-answer';
import { User } from '../users/domain/user';
import { Quiz } from '../quizzes/domain/quiz';

@Injectable()
export class UserQuizAnswersService {
  constructor(
    private readonly userQuizAnswerRepository: UserQuizAnswerRepository,
  ) {}

  create(createUserQuizAnswerDto: CreateUserQuizAnswerDto) {
    return this.userQuizAnswerRepository.create(createUserQuizAnswerDto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.userQuizAnswerRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: UserQuizAnswer['id']) {
    return this.userQuizAnswerRepository.findById(id);
  }

  update(
    id: UserQuizAnswer['id'],
    updateUserQuizAnswerDto: UpdateUserQuizAnswerDto,
  ) {
    return this.userQuizAnswerRepository.update(id, updateUserQuizAnswerDto);
  }

  remove(id: UserQuizAnswer['id']) {
    return this.userQuizAnswerRepository.remove(id);
  }

  findByUserIdAndQuizId(userId: User['id'], quizId: Quiz['id']) {
    return this.userQuizAnswerRepository.findByUserIdAndQuizId(userId, quizId);
  }
}
