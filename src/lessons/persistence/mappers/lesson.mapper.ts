import { Course } from '../../../courses/domain/course';
import { CourseEntity } from '../../../courses/infrastructure/persistence/relational/entities/course.entity';
import { Lesson } from '../../domain/lesson';
import { LessonEntity } from '../entities/lesson.entity';

export class LessonMapper {
  static toDomain(raw: LessonEntity): Lesson {
    const domainEntity = new Lesson();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.description = raw.description;
    domainEntity.order = raw.order;
    const course = new Course();
    course.id = raw.course.id;
    domainEntity.course = course;
    return domainEntity;
  }

  static toPersistence(domainEntity: Lesson): LessonEntity {
    const persistenceEntity = new LessonEntity();
    persistenceEntity.id = domainEntity.id;
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.order = domainEntity.order;
    const courseEntity = new CourseEntity();
    courseEntity.id = domainEntity.course.id;
    persistenceEntity.course = courseEntity;
    return persistenceEntity;
  }
}
