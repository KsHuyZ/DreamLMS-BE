import { QuestionEntity } from '../../../../../questions/infrastructure/persistence/relational/entities/question.entity';
import { Answer } from '../../../../domain/answer';
import { AnswerEntity } from '../entities/answer.entity';

export class AnswerMapper {
  static toDomain(raw: AnswerEntity): Answer {
    const domainEntity = new Answer();
    domainEntity.id = raw.id;
    domainEntity.title = raw.title;
    domainEntity.question = raw.question;
    domainEntity.isCorrect = raw.isCorrect;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    return domainEntity;
  }

  static toPersistence(domainEntity: Answer): AnswerEntity {
    const persistenceEntity = new AnswerEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    const questionEntity = new QuestionEntity();
    questionEntity.id = domainEntity.question.id;
    persistenceEntity.question = questionEntity;
    persistenceEntity.title = domainEntity.title;
    persistenceEntity.isCorrect = domainEntity.isCorrect;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
