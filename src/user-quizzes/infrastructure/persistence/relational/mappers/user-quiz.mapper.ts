import { UserQuiz } from '../../../../domain/user-quiz';
import { UserQuizEntity } from '../entities/user-quiz.entity';

export class UserQuizMapper {
  static toDomain(raw: UserQuizEntity): UserQuiz {
    const domainEntity = new UserQuiz();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: UserQuiz): UserQuizEntity {
    const persistenceEntity = new UserQuizEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
