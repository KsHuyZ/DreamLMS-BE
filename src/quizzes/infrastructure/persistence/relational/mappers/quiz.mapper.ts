import { Quiz } from '../../../../domain/quiz';
import { QuizEntity } from '../entities/quiz.entity';

export class QuizMapper {
  static toDomain(raw: QuizEntity): Quiz {
    const domainEntity = new Quiz();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Quiz): QuizEntity {
    const persistenceEntity = new QuizEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
