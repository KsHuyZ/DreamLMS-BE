import { Module } from '@nestjs/common';
import { CourseTagRepository } from './relational/course-tag.repository';
import { CourseTagRelationalRepository } from './relational/repositories/course-tag.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseTagEntity } from './relational/entities/course-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseTagEntity])],
  providers: [
    {
      provide: CourseTagRepository,
      useClass: CourseTagRelationalRepository,
    },
  ],
  exports: [CourseTagRepository],
})
export class RelationalCourseTagPersistenceModule {}
