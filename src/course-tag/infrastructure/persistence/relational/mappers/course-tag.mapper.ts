import { CourseEntity } from '../../../../../courses/infrastructure/persistence/relational/entities/course.entity';
import { TagEntity } from '../../../../../tags/persistence/entities/tag.entity';
import { CourseTag } from '../../../../domain/course-tag';
import { CourseTagEntity } from '../entities/course-tag.entity';

export class CourseTagMapper {
  static toDomain(raw: CourseTagEntity): CourseTag {
    const domainEntity = new CourseTag();
    domainEntity.id = raw.id;
    domainEntity.tag = raw.tag;
    domainEntity.course = raw.course;
    return domainEntity;
  }

  static toPersistence(domainEntity: CourseTag): CourseTagEntity {
    const persistenceEntity = new CourseTagEntity();
    persistenceEntity.id = domainEntity.id;
    const tag = new TagEntity();
    tag.id = domainEntity.tag.id;
    persistenceEntity.tag = tag;
    const course = new CourseEntity();
    course.id = domainEntity.course.id;
    persistenceEntity.course = course;
    return persistenceEntity;
  }
}
