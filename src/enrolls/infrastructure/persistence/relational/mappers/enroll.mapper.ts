import { CourseEntity } from '../../../../../courses/infrastructure/persistence/relational/entities/course.entity';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { Enroll } from '../../../../domain/enroll';
import { EnrollEntity } from '../entities/enroll.entity';

export class EnrollMapper {
  static toDomain(raw: EnrollEntity): Enroll {
    const domainEntity = new Enroll();
    domainEntity.id = raw.id;
    domainEntity.user = raw.user;
    domainEntity.course = raw.course;
    domainEntity.haveCertificate = raw.haveCertificate;
    return domainEntity;
  }

  static toPersistence(domainEntity: Enroll): EnrollEntity {
    const persistenceEntity = new EnrollEntity();
    persistenceEntity.id = domainEntity.id;
    const user = new UserEntity();
    user.id = domainEntity.user.id;
    persistenceEntity.user = user;
    const course = new CourseEntity();
    course.id = domainEntity.course.id;
    persistenceEntity.course = course;
    persistenceEntity.haveCertificate = domainEntity.haveCertificate;
    return persistenceEntity;
  }
}
