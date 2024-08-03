import { RelatedCourse } from '../../../../domain/related-course';
import { RelatedCourseEntity } from '../entities/related-course.entity';

export class RelatedCourseMapper {
  static toDomain(raw: RelatedCourseEntity): RelatedCourse {
    const domainEntity = new RelatedCourse();
    domainEntity.id = raw.id;
    domainEntity.courseId = raw.courseId;
    domainEntity.relatedCourse = raw.relatedCourse;
    return domainEntity;
  }

  static toPersistence(domainEntity: RelatedCourse): RelatedCourseEntity {
    const persistenceEntity = new RelatedCourseEntity();
    persistenceEntity.id = domainEntity.id;
    persistenceEntity.courseId = domainEntity.courseId;
    const relatedCourseEntity = new RelatedCourseEntity();
    relatedCourseEntity.relatedCourse.id = domainEntity.relatedCourse.id;
    persistenceEntity.relatedCourse = relatedCourseEntity.relatedCourse;
    return persistenceEntity;
  }
}
