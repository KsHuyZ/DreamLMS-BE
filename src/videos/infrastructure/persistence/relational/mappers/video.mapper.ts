import { LessonEntity } from '../../../../../lessons/persistence/entities/lesson.entity';
import { Video } from '../../../../domain/video';
import { VideoEntity } from '../entities/video.entity';

export class VideoMapper {
  static toDomain(raw: VideoEntity): Video {
    const domainEntity = new Video();
    domainEntity.id = raw.id;
    domainEntity.title = raw.title;
    domainEntity.description = raw.description;
    domainEntity.videoId = raw.videoId;
    domainEntity.order = raw.order;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.duration = raw.duration;
    domainEntity.lesson = raw.lesson;
    return domainEntity;
  }

  static toPersistence(domainEntity: Video): VideoEntity {
    const persistenceEntity = new VideoEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.title = domainEntity.title;
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.videoId = domainEntity.videoId;
    persistenceEntity.order = domainEntity.order;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.duration = domainEntity.duration;
    const lesson = new LessonEntity();
    lesson.id = domainEntity.lesson.id;
    persistenceEntity.lesson = lesson;
    return persistenceEntity;
  }
}
