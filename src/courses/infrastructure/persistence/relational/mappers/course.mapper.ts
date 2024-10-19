import { Course } from '../../../../domain/course';
import { CourseEntity } from '../entities/course.entity';

export class CourseMapper {
  static toDomain(raw: CourseEntity): Course {
    const course = new Course();
    course.id = raw.id;
    course.name = raw.name;
    course.price = raw.price;
    course.related =
      raw.related?.map((related) => {
        const relatedCourse = new Course();
        relatedCourse.id = related.id;
        return relatedCourse;
      }) ?? [];
    course.status = raw.status;
    course.lessons = raw.lessons;
    course.shortDescription = raw.shortDescription;
    course.description = raw.description;
    course.videoPreview = raw.videoPreview;
    course.image = raw.image;
    course.level = raw.level;
    course.isDeleted = raw.isDeleted;

    course.createdAt = raw.createdAt;
    course.updatedAt = raw.updatedAt;
    course.deletedAt = raw.deletedAt;
    return course;
  }

  static toPersistence(course: Course): CourseEntity {
    const courseEntity = new CourseEntity();
    courseEntity.id = course.id;
    courseEntity.name = course.name;
    courseEntity.price = course.price;
    courseEntity.shortDescription = course.shortDescription;
    courseEntity.description = course.description;
    courseEntity.image = course.image;
    courseEntity.level = course.level;
    courseEntity.status = course.status;
    courseEntity.isDeleted = course.isDeleted;
    courseEntity.createdAt = course.createdAt;
    courseEntity.updatedAt = course.updatedAt;
    courseEntity.deletedAt = course.deletedAt;
    return courseEntity;
  }
}
