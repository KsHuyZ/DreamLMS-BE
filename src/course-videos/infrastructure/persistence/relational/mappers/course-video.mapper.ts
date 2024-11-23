import { CourseEntity } from '../../../../../courses/infrastructure/persistence/relational/entities/course.entity';
import { VideoMapper } from '../../../../../videos/infrastructure/persistence/relational/mappers/video.mapper';
import { CourseVideo } from '../../../../domain/course-video';
import { CourseVideoEntity } from '../entities/course-video.entity';

export class CourseVideoMapper {
  static toDomain(raw: CourseVideoEntity): CourseVideo {
    const domainEntity = new CourseVideo();
    domainEntity.id = raw.id;
    domainEntity.course = raw.course;
    domainEntity.video = raw.video;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: CourseVideo): CourseVideoEntity {
    const persistenceEntity = new CourseVideoEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    const courseEntity = new CourseEntity();
    courseEntity.id = domainEntity.course.id;
    persistenceEntity.course = courseEntity;

    persistenceEntity.video = VideoMapper.toPersistence(domainEntity.video);
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
