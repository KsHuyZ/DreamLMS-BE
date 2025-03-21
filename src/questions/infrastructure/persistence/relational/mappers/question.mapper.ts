import { AnswerEntity } from '../../../../../answers/infrastructure/persistence/relational/entities/answer.entity';
import { Question } from '../../../../domain/question';
import { QuestionEntity } from '../entities/question.entity';

export class QuestionMapper {
  static toDomain(raw: QuestionEntity): Question {
    const domainEntity = new Question();
    domainEntity.id = raw.id;
    domainEntity.quiz = raw.quiz;
    domainEntity.title = raw.title;
    domainEntity.type = raw.type;
    domainEntity.answers = raw.answers;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    return domainEntity;
  }

  static toPersistence(domainEntity: Question): QuestionEntity {
    const persistenceEntity = new QuestionEntity();
    persistenceEntity.id = domainEntity.id;
    persistenceEntity.title = domainEntity.title;
    persistenceEntity.answers = domainEntity.answers.map((answer) => {
      const answerEntity = new AnswerEntity();
      answerEntity.id = answer.id;
      answerEntity.isCorrect = answer.isCorrect;
      answerEntity.title = answer.title;
      return answerEntity;
    });
    persistenceEntity.type = domainEntity.type;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
