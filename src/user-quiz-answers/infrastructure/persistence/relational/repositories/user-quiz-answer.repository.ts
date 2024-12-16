import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserQuizAnswerEntity } from '../entities/user-quiz-answer.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { UserQuizAnswer } from '../../../../domain/user-quiz-answer';
import { UserQuizAnswerRepository } from '../../user-quiz-answer.repository';
import { UserQuizAnswerMapper } from '../mappers/user-quiz-answer.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { Quiz } from '../../../../../quizzes/domain/quiz';
import { User } from '../../../../../users/domain/user';
import { Answer } from '../../../../../answers/domain/answer';
import { UserQuiz } from '../../../../../user-quizzes/domain/user-quiz';
import { Question } from '../../../../../questions/domain/question';

@Injectable()
export class UserQuizAnswerRelationalRepository
  implements UserQuizAnswerRepository
{
  constructor(
    @InjectRepository(UserQuizAnswerEntity)
    private readonly userQuizAnswerRepository: Repository<UserQuizAnswerEntity>,
  ) {}

  async create(data: UserQuizAnswer): Promise<UserQuizAnswer> {
    const persistenceModel = UserQuizAnswerMapper.toPersistence(data);
    const newEntity = await this.userQuizAnswerRepository.save(
      this.userQuizAnswerRepository.create(persistenceModel),
    );
    return UserQuizAnswerMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<UserQuizAnswer[]> {
    const entities = await this.userQuizAnswerRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((user) => UserQuizAnswerMapper.toDomain(user));
  }

  async findById(
    id: UserQuizAnswer['id'],
  ): Promise<NullableType<UserQuizAnswer>> {
    const entity = await this.userQuizAnswerRepository.findOne({
      where: { id },
    });

    return entity ? UserQuizAnswerMapper.toDomain(entity) : null;
  }

  async update(
    id: UserQuizAnswer['id'],
    payload: Partial<UserQuizAnswer>,
  ): Promise<UserQuizAnswer> {
    const entity = await this.userQuizAnswerRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.userQuizAnswerRepository.save(
      this.userQuizAnswerRepository.create(
        UserQuizAnswerMapper.toPersistence({
          ...UserQuizAnswerMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return UserQuizAnswerMapper.toDomain(updatedEntity);
  }

  async remove(id: UserQuizAnswer['id']): Promise<void> {
    await this.userQuizAnswerRepository.delete(id);
  }
  async findByUserIdAndQuizId(
    userId: User['id'],
    quizId: Quiz['id'],
  ): Promise<UserQuizAnswer[]> {
    const entities = await this.userQuizAnswerRepository.find({
      where: {
        userQuiz: {
          quiz: {
            id: quizId,
          },
          user: {
            id: userId,
          },
        },
      },
      relations: ['answer', 'question'],
    });
    return entities.map(UserQuizAnswerMapper.toDomain);
  }

  async createMany(
    quizzes: { question: Question; answer: Answer; userQuiz: UserQuiz }[],
  ): Promise<UserQuizAnswer[]> {
    const persistenceModel = quizzes.map(UserQuizAnswerMapper.toDomain);
    const newEntity = await this.userQuizAnswerRepository.save(
      this.userQuizAnswerRepository.create(persistenceModel),
    );
    return newEntity.map(UserQuizAnswerMapper.toDomain);
  }
}
