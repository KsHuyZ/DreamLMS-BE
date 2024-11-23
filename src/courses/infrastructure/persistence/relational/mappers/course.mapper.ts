import { CategoryEntity } from '../../../../../categories/persistence/entities/category.entity';
import { ImageEntity } from '../../../../../cloudinary/persistence/entities/image.entity';
import { TagEntity } from '../../../../../tags/persistence/entities/tag.entity';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
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
    course.image = raw.image;
    course.level = raw.level;
    course.createdBy = raw.createdBy;
    course.createdAt = raw.createdAt;
    course.updatedAt = raw.updatedAt;
    course.deletedAt = raw.deletedAt;
    course.tags = raw.tags;
    course.categories = raw.categories;
    return course;
  }

  static toPersistence(course: Course): CourseEntity {
    const courseEntity = new CourseEntity();
    courseEntity.id = course.id;
    courseEntity.name = course.name;
    courseEntity.price = course.price;
    courseEntity.shortDescription = course.shortDescription;
    courseEntity.description = course.description;
    if (course.image && course.image.id) {
      const image = new ImageEntity();
      image.id = course.image.id;
      courseEntity.image = image;
    }

    courseEntity.level = course.level;
    courseEntity.status = course.status;
    if (course.createdBy) {
      const userEntity = new UserEntity();
      userEntity.id = course.createdBy.id;
      courseEntity.createdBy = userEntity;
    }

    if (course.related && course.related.length) {
      courseEntity.related = course.related.map((related) => {
        const courseRelated = new CourseEntity();
        courseRelated.id = related.id;
        return courseRelated;
      });
    }

    courseEntity.createdAt = course.createdAt;
    courseEntity.updatedAt = course.updatedAt;
    courseEntity.deletedAt = course.deletedAt;
    if (course.tags) {
      courseEntity.tags = course.tags.map((tag) => {
        const tagEntity = new TagEntity();
        tagEntity.id = tag.id;
        return tagEntity;
      });
    }

    if (courseEntity.categories) {
      courseEntity.categories = course.categories.map((category) => {
        const categoryEntity = new CategoryEntity();
        categoryEntity.id = category.id;
        return categoryEntity;
      });
    }

    return courseEntity;
  }
}
