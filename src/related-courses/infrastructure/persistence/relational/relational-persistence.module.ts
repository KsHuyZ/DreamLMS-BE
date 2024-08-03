import { Module } from '@nestjs/common';
import { RelatedCourseRepository } from '../related-course.repository';
import { RelatedCourseRelationalRepository } from './repositories/related-course.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelatedCourseEntity } from './entities/related-course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RelatedCourseEntity])],
  providers: [
    {
      provide: RelatedCourseRepository,
      useClass: RelatedCourseRelationalRepository,
    },
  ],
  exports: [RelatedCourseRepository],
})
export class RelationalRelatedCoursePersistenceModule {}
