import { CourseEntity } from '../../../../../courses/infrastructure/persistence/relational/entities/course.entity';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { Transaction } from '../../../../domain/transaction';
import { TransactionEntity } from '../entities/transaction.entity';

export class TransactionMapper {
  static toDomain(raw: TransactionEntity): Transaction {
    const domainEntity = new Transaction();
    domainEntity.id = raw.id;
    domainEntity.user = raw.user;
    domainEntity.course = raw.course;
    domainEntity.amount = raw.amount;
    domainEntity.amountUnit = raw.amountUnit;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Transaction): TransactionEntity {
    const persistenceEntity = new TransactionEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    const userEntity = new UserEntity();
    userEntity.id = domainEntity.user.id;
    persistenceEntity.user = userEntity;

    const courseEntity = new CourseEntity();
    courseEntity.id = domainEntity.course.id;
    persistenceEntity.course = courseEntity;

    persistenceEntity.amount = domainEntity.amount;
    persistenceEntity.amountUnit = domainEntity.amountUnit;

    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
