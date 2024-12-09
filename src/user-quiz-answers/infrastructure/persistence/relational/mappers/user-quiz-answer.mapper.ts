import { AnswerEntity } from '../../../../../answers/infrastructure/persistence/relational/entities/answer.entity';
import { QuestionEntity } from '../../../../../questions/infrastructure/persistence/relational/entities/question.entity';
import { UserQuizEntity } from '../../../../../user-quizzes/infrastructure/persistence/relational/entities/user-quiz.entity';
import { UserQuizAnswer } from '../../../../domain/user-quiz-answer';
import { UserQuizAnswerEntity } from '../entities/user-quiz-answer.entity';

export class UserQuizAnswerMapper {
  static toDomain(raw: UserQuizAnswerEntity): UserQuizAnswer {
    const domainEntity = new UserQuizAnswer();
    domainEntity.id = raw.id;
    domainEntity.answer = raw.answer;
    domainEntity.question = raw.question;
    domainEntity.userQuiz = raw.userQuiz;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    return domainEntity;
  }

  static toPersistence(domainEntity: UserQuizAnswer): UserQuizAnswerEntity {
    const persistenceEntity = new UserQuizAnswerEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }

    const userQuiz = new UserQuizEntity();
    userQuiz.id = domainEntity.userQuiz.id;
    persistenceEntity.userQuiz = userQuiz;

    const answerEntity = new AnswerEntity();
    answerEntity.id = domainEntity.answer.id;
    persistenceEntity.answer = answerEntity;

    const questionEntity = new QuestionEntity();
    questionEntity.id = domainEntity.question.id;
    persistenceEntity.question = questionEntity;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
