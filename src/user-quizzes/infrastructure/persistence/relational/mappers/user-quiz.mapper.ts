import { QuizEntity } from '../../../../../quizzes/infrastructure/persistence/relational/entities/quiz.entity';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { UserQuiz } from '../../../../domain/user-quiz';
import { UserQuizEntity } from '../entities/user-quiz.entity';

export class UserQuizMapper {
  static toDomain(raw: UserQuizEntity): UserQuiz {
    const domainEntity = new UserQuiz();
    domainEntity.id = raw.id;
    domainEntity.quiz = raw.quiz;
    domainEntity.score = raw.score;
    domainEntity.user = raw.user;
    domainEntity.isCompleted = raw.isCompleted;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: UserQuiz): UserQuizEntity {
    const persistenceEntity = new UserQuizEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.score = domainEntity.score;
    if (domainEntity.user) {
      const userEntity = new UserEntity();
      userEntity.id = domainEntity.user.id;
      persistenceEntity.user = userEntity;
    }
    if (domainEntity.quiz) {
      const quizEntity = new QuizEntity();
      quizEntity.id = domainEntity.quiz.id;
      persistenceEntity.quiz = quizEntity;
    }
    persistenceEntity.isCompleted = domainEntity.isCompleted;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
