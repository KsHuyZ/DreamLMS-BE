import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizEntity } from '../entities/quiz.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Quiz } from '../../../../domain/quiz';
import { QuizRepository } from '../../quiz.repository';
import { QuizMapper } from '../mappers/quiz.mapper';

@Injectable()
export class quizRelationalRepository implements QuizRepository {
  constructor(
    @InjectRepository(QuizEntity)
    private readonly quizRepository: Repository<QuizEntity>,
  ) {}

  async create(data: Quiz): Promise<Quiz> {
    const persistenceModel = QuizMapper.toPersistence(data);
    const newEntity = await this.quizRepository.save(
      this.quizRepository.create(persistenceModel),
    );
    return QuizMapper.toDomain(newEntity);
  }

  async findById(id: Quiz['id']): Promise<NullableType<Quiz>> {
    const entity = await this.quizRepository.findOne({
      where: { id },
      relations: ['questions.answers'],
    });

    return entity ? QuizMapper.toDomain(entity) : null;
  }

  async update(id: Quiz['id'], payload: Partial<Quiz>): Promise<Quiz> {
    const entity = await this.quizRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.quizRepository.save(
      this.quizRepository.create(
        QuizMapper.toPersistence({
          ...QuizMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return QuizMapper.toDomain(updatedEntity);
  }

  async remove(id: Quiz['id']): Promise<void> {
    await this.quizRepository.delete(id);
  }
}
