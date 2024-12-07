import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserQuizEntity } from '../entities/user-quiz.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { UserQuiz } from '../../../../domain/user-quiz';
import { UserQuizRepository } from '../../user-quiz.repository';
import { UserQuizMapper } from '../mappers/user-quiz.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class UserQuizRelationalRepository implements UserQuizRepository {
  constructor(
    @InjectRepository(UserQuizEntity)
    private readonly user_quizRepository: Repository<UserQuizEntity>,
  ) {}

  async create(data: UserQuiz): Promise<UserQuiz> {
    const persistenceModel = UserQuizMapper.toPersistence(data);
    const newEntity = await this.user_quizRepository.save(
      this.user_quizRepository.create(persistenceModel),
    );
    return UserQuizMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<UserQuiz[]> {
    const entities = await this.user_quizRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((user) => UserQuizMapper.toDomain(user));
  }

  async findById(id: UserQuiz['id']): Promise<NullableType<UserQuiz>> {
    const entity = await this.user_quizRepository.findOne({
      where: { id },
    });

    return entity ? UserQuizMapper.toDomain(entity) : null;
  }

  async update(
    id: UserQuiz['id'],
    payload: Partial<UserQuiz>,
  ): Promise<UserQuiz> {
    const entity = await this.user_quizRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.user_quizRepository.save(
      this.user_quizRepository.create(
        UserQuizMapper.toPersistence({
          ...UserQuizMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return UserQuizMapper.toDomain(updatedEntity);
  }

  async remove(id: UserQuiz['id']): Promise<void> {
    await this.user_quizRepository.delete(id);
  }
}
