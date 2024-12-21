import { CourseEntity } from '../../../../../courses/infrastructure/persistence/relational/entities/course.entity';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { Rate } from '../../../../domain/rate';
import { RateEntity } from '../entities/rate.entity';

export class RateMapper {
  static toDomain(raw: RateEntity): Rate {
    const domainEntity = new Rate();
    domainEntity.id = raw.id;
    domainEntity.star = raw.star;
    domainEntity.comment = raw.comment;
    domainEntity.user = raw.user;
    domainEntity.course = raw.course;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Rate): RateEntity {
    const persistenceEntity = new RateEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.star = domainEntity.star;
    persistenceEntity.comment = domainEntity.comment;
    const course = new CourseEntity();
    course.id = domainEntity.course.id;
    persistenceEntity.course = course;
    const user = new UserEntity();
    user.id = domainEntity.user.id;
    persistenceEntity.user = user;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
