import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnswerEntity } from '../entities/answer.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Answer } from '../../../../domain/answer';
import { AnswerRepository } from '../../answer.repository';
import { AnswerMapper } from '../mappers/answer.mapper';

@Injectable()
export class AnswerRelationalRepository implements AnswerRepository {
  constructor(
    @InjectRepository(AnswerEntity)
    private readonly answerRepository: Repository<AnswerEntity>,
  ) {}

  async createMany(data: Answer[]): Promise<Answer[]> {
    const persistenceModel = data.map((d) => AnswerMapper.toPersistence(d));
    const newEntity = await this.answerRepository.save(
      this.answerRepository.create(persistenceModel),
    );
    return newEntity.map((entity) => AnswerMapper.toDomain(entity));
  }

  async findById(id: Answer['id']): Promise<NullableType<Answer>> {
    const entity = await this.answerRepository.findOne({
      where: { id },
    });

    return entity ? AnswerMapper.toDomain(entity) : null;
  }

  async update(id: Answer['id'], payload: Partial<Answer>): Promise<Answer> {
    const entity = await this.answerRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.answerRepository.save(
      this.answerRepository.create(
        AnswerMapper.toPersistence({
          ...AnswerMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return AnswerMapper.toDomain(updatedEntity);
  }

  async remove(id: Answer['id']): Promise<void> {
    await this.answerRepository.delete(id);
  }
}
