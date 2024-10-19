import { Module } from '@nestjs/common';

import { CoursesCategoryService } from './course-category.service';
import { RelationalCourseCategoryPersistenceModule } from './infrastructure/persistence/persistence.module';

@Module({
  imports: [RelationalCourseCategoryPersistenceModule],
  providers: [CoursesCategoryService],
  exports: [CoursesCategoryService, RelationalCourseCategoryPersistenceModule],
})
export class CourseCategoryModule {}
