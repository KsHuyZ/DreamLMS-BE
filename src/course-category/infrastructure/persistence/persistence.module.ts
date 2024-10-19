import { Module } from '@nestjs/common';
import { CourseCategoryRepository } from './relational/course-category.repository';
import { CourseTagRelationalRepository } from './relational/repositories/course-category.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseCategoryEntity } from './relational/entities/course-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseCategoryEntity])],
  providers: [
    {
      provide: CourseCategoryRepository,
      useClass: CourseTagRelationalRepository,
    },
  ],
  exports: [CourseCategoryRepository],
})
export class RelationalCourseCategoryPersistenceModule {}
