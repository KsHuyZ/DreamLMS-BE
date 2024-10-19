import { Module } from '@nestjs/common';

import { CoursesTagService } from './course-tag.service';
import { RelationalCourseTagPersistenceModule } from './infrastructure/persistence/persistence.module';

@Module({
  imports: [RelationalCourseTagPersistenceModule],
  providers: [CoursesTagService],
  exports: [CoursesTagService, RelationalCourseTagPersistenceModule],
})
export class CourseTagModule {}
