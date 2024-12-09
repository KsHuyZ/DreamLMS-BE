import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionEntity } from '../entities/question.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Question } from '../../../../domain/question';
import { QuestionRepository } from '../../question.repository';
import { QuestionMapper } from '../mappers/question.mapper';
import { Quiz } from '../../../../../quizzes/domain/quiz';

@Injectable()
export class QuestionRelationalRepository implements QuestionRepository {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
  ) {}

  async createMany(data: Question[]): Promise<Question[]> {
    const persistenceModel = data.map((d) => QuestionMapper.toPersistence(d));
    const newEntity = await this.questionRepository.save(
      this.questionRepository.create(persistenceModel),
    );
    return newEntity.map((entity) => QuestionMapper.toDomain(entity));
  }

  async findById(id: Question['id']): Promise<NullableType<Question>> {
    const entity = await this.questionRepository.findOne({
      where: { id },
    });

    return entity ? QuestionMapper.toDomain(entity) : null;
  }

  async update(
    id: Question['id'],
    payload: Partial<Question>,
  ): Promise<Question> {
    const entity = await this.questionRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.questionRepository.save(
      this.questionRepository.create(
        QuestionMapper.toPersistence({
          ...QuestionMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return QuestionMapper.toDomain(updatedEntity);
  }

  async remove(id: Question['id']): Promise<void> {
    await this.questionRepository.delete(id);
  }

  async findByQuizId(id: Quiz['id']): Promise<Question[]> {
    const questions = await this.questionRepository.find({
      where: {
        quiz: {
          id,
        },
      },
      relations: ['answers'],
    });
    return questions.map(QuestionMapper.toDomain);
  }
}
