import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UpdateUserQuizDto } from './dto/update-user-quiz.dto';
import { UserQuizRepository } from './infrastructure/persistence/user-quiz.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { UserQuiz } from './domain/user-quiz';
import { UsersService } from '../users/users.service';
import { QuizzesService } from '../quizzes/quizzes.service';
import { User } from '../users/domain/user';
import { Course } from '../courses/domain/course';

@Injectable()
export class UserQuizzesService {
  constructor(
    private readonly userQuizRepository: UserQuizRepository,
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => QuizzesService))
    private readonly quizzesService: QuizzesService,
  ) {}

  async create({ userId, quizId }: { userId: string; quizId: string }) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new BadRequestException('Please sign in');
    const quiz = await this.quizzesService.findOne(quizId);
    if (!quiz) throw new BadRequestException('Quiz not found');
    return this.userQuizRepository.create({
      score: 0,
      user,
      quiz,
      isCompleted: false,
    });
  }

  findByUserIdAndQuizId({
    userId,
    quizId,
  }: {
    userId: string;
    quizId: string;
  }) {
    return this.userQuizRepository.findByUserIdAndQuizId(userId, quizId);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.userQuizRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: UserQuiz['id']) {
    return this.userQuizRepository.findById(id);
  }

  update(id: UserQuiz['id'], updateUserQuizDto: UpdateUserQuizDto) {
    return this.userQuizRepository.update(id, updateUserQuizDto);
  }

  remove(id: UserQuiz['id']) {
    return this.userQuizRepository.remove(id);
  }

  findByUserIdAndCourseId(userId: User['id'], courseId: Course['id']) {
    return this.userQuizRepository.findByUserIdAndCourseId(userId, courseId);
  }
  countByUserIdAndCourseId(userId: User['id'], courseId: Course['id']) {
    return this.userQuizRepository.countByUserIdAndCourseId(userId, courseId);
  }
}
