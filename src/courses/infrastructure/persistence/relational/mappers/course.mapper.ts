import { Course } from '../../../../domain/course';
import { CourseEntity } from '../entities/course.entity';
import { Status } from '../../../../../statuses/domain/status';
import { StatusEntity } from '../../../../../statuses/infrastructure/persistence/relational/entities/status.entity';

export class CourseMapper {
  static toDomain(raw: CourseEntity): Course {
    const course = new Course();
    course.id = raw.id;
    course.name = raw.name;
    course.price = raw.price;
    course.related = raw.related.map((related) =>
      CourseMapper.toDomain(related),
    );
    course.shortDescription = raw.shortDescription;
    course.description = raw.description;
    course.videoPreview = raw.videoPreview;
    course.image = raw.image;
    course.levelId = raw.levelId;
    course.isDeleted = raw.isDeleted;

    if (raw.status) {
      course.status = new Status();
      course.status.id = raw.status.id;
    }

    course.createdAt = raw.createdAt;
    course.updatedAt = raw.updatedAt;
    course.deletedAt = raw.deletedAt;
    return course;
  }

  static toPersistence(course: Course): CourseEntity {
    const status = new StatusEntity();
    status.id = course.status.id;
    const courseEntity = new CourseEntity();
    courseEntity.id = course.id;
    courseEntity.name = course.name;
    courseEntity.price = course.price;
    courseEntity.shortDescription = course.shortDescription;
    courseEntity.videoPreview = course.videoPreview;
    courseEntity.description = course.description;
    courseEntity.image = course.image;
    courseEntity.levelId = course.levelId;
    courseEntity.status = status;
    courseEntity.isDeleted = course.isDeleted;
    courseEntity.createdAt = course.createdAt;
    courseEntity.updatedAt = course.updatedAt;
    courseEntity.deletedAt = course.deletedAt;
    return courseEntity;
  }
}
