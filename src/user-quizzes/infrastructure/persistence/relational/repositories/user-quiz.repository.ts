import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { UserQuizEntity } from '../entities/user-quiz.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { UserQuiz } from '../../../../domain/user-quiz';
import { UserQuizRepository } from '../../user-quiz.repository';
import { UserQuizMapper } from '../mappers/user-quiz.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { Quiz } from '../../../../../quizzes/domain/quiz';
import { User } from '../../../../../users/domain/user';
import { Course } from '../../../../../courses/domain/course';

@Injectable()
export class UserQuizRelationalRepository implements UserQuizRepository {
  constructor(
    @InjectRepository(UserQuizEntity)
    private readonly userQuizRepository: Repository<UserQuizEntity>,
  ) {}

  async create(data: UserQuiz): Promise<UserQuiz> {
    const persistenceModel = UserQuizMapper.toPersistence(data);
    const newEntity = await this.userQuizRepository.save(
      this.userQuizRepository.create(persistenceModel),
    );
    return UserQuizMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<UserQuiz[]> {
    const entities = await this.userQuizRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((user) => UserQuizMapper.toDomain(user));
  }

  async findById(id: UserQuiz['id']): Promise<NullableType<UserQuiz>> {
    const entity = await this.userQuizRepository.findOne({
      where: { id },
    });

    return entity ? UserQuizMapper.toDomain(entity) : null;
  }

  async update(
    id: UserQuiz['id'],
    payload: Partial<UserQuiz>,
  ): Promise<UserQuiz> {
    const entity = await this.userQuizRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.userQuizRepository.save(
      this.userQuizRepository.create(
        UserQuizMapper.toPersistence({
          ...UserQuizMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return UserQuizMapper.toDomain(updatedEntity);
  }

  async remove(id: UserQuiz['id']): Promise<void> {
    await this.userQuizRepository.delete(id);
  }

  async findByUserIdAndQuizId(
    userId: User['id'],
    quizId: Quiz['id'],
  ): Promise<NullableType<UserQuiz>> {
    const entity = await this.userQuizRepository.findOne({
      where: {
        user: {
          id: userId,
        },
        quiz: {
          id: quizId,
        },
      },
      order: {
        createdAt: 'DESC',
      },
      relations: ['quiz', 'user'],
    });
    return entity ? UserQuizMapper.toDomain(entity) : null;
  }

  findByUserIdAndCourseId(
    userId: User['id'],
    courseId: Course['id'],
  ): Promise<UserQuiz[]> {
    return this.userQuizRepository.find({
      where: {
        user: {
          id: userId,
        },
        quiz: {
          lesson: {
            course: {
              id: courseId,
            },
          },
        },
        score: MoreThan(50),
        isCompleted: true,
      },
      relations: ['quiz'],
    });
  }
  countByUserIdAndCourseId(
    userId: User['id'],
    courseId: Course['id'],
  ): Promise<number> {
    return this.userQuizRepository.count({
      where: {
        user: {
          id: userId,
        },
        quiz: {
          lesson: {
            course: {
              id: courseId,
            },
          },
        },
        score: MoreThan(50),
        isCompleted: true,
      },
      relations: ['quiz'],
    });
  }
}
