import { CategoryEntity } from '../../../../../categories/persistence/entities/category.entity';
import { CourseEntity } from '../../../../../courses/infrastructure/persistence/relational/entities/course.entity';
import { CourseCategory } from '../../../../domain/course-category';
import { CourseCategoryEntity } from '../entities/course-category.entity';

export class CourseCategoryMapper {
  static toDomain(raw: CourseCategoryEntity): CourseCategory {
    const domainEntity = new CourseCategory();
    domainEntity.id = raw.id;
    domainEntity.category = raw.category;
    domainEntity.course = raw.course;
    return domainEntity;
  }

  static toPersistence(domainEntity: CourseCategory): CourseCategoryEntity {
    const persistenceEntity = new CourseCategoryEntity();
    persistenceEntity.id = domainEntity.id;
    const category = new CategoryEntity();
    category.id = domainEntity.category.id;
    persistenceEntity.category = category;
    const course = new CourseEntity();
    course.id = domainEntity.course.id;
    persistenceEntity.course = course;
    return persistenceEntity;
  }
}
