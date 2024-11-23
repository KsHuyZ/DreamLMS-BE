import { LessonEntity } from '../../../../../lessons/persistence/entities/lesson.entity';
import { VideoMapper } from '../../../../../videos/infrastructure/persistence/relational/mappers/video.mapper';
import { LessonVideo } from '../../../../domain/lesson-video';
import { LessonVideoEntity } from '../entities/lesson-video.entity';

export class LessonVideoMapper {
  static toDomain(raw: LessonVideoEntity): LessonVideo {
    const domainEntity = new LessonVideo();
    domainEntity.id = raw.id;
    domainEntity.title = raw.title;
    domainEntity.description = raw.description;
    domainEntity.lesson = raw.lesson;
    domainEntity.order = raw.order;
    domainEntity.video = raw.video;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    return domainEntity;
  }

  static toPersistence(domainEntity: LessonVideo): LessonVideoEntity {
    const persistenceEntity = new LessonVideoEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.title = domainEntity.title;
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.isFree = domainEntity.isFree;
    persistenceEntity.order = domainEntity.order;
    if (domainEntity.lesson) {
      const lessonEntity = new LessonEntity();
      lessonEntity.id = domainEntity.lesson.id;
      persistenceEntity.lesson = lessonEntity;
    }
    persistenceEntity.video = VideoMapper.toPersistence(domainEntity.video);

    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
