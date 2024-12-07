import { LessonVideoEntity } from '../../../../../lesson-videos/infrastructure/persistence/relational/entities/lesson-video.entity';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { UserVideo } from '../../../../domain/user-video';
import { UserVideoEntity } from '../entities/user-video.entity';

export class UserVideoMapper {
  static toDomain(raw: UserVideoEntity): UserVideo {
    const domainEntity = new UserVideo();
    domainEntity.id = raw.id;
    domainEntity.user = raw.user;
    domainEntity.video = raw.video;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    return domainEntity;
  }

  static toPersistence(domainEntity: UserVideo): UserVideoEntity {
    const persistenceEntity = new UserVideoEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    const userEntity = new UserEntity();
    userEntity.id = domainEntity.user.id;
    persistenceEntity.user = userEntity;
    const lessonVideoEntity = new LessonVideoEntity();
    lessonVideoEntity.id = domainEntity.video.id;
    persistenceEntity.video = lessonVideoEntity;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
