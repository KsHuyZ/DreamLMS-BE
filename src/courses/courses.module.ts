import { Module } from '@nestjs/common';

import { CoursesController } from './courses.controller';

import { CoursesService } from './courses.service';
import { RelationalCoursePersistenceModule } from './infrastructure/persistence/relational/persistence.module';
import { VideosModule } from '../videos/videos.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { TagsModule } from '../tags/tag.module';
import { CategoriesModule } from '../categories/category.module';
import { CourseTagModule } from '../course-tag/course-tag.module';
import { CourseCategoryModule } from '../course-category/course-category.module';
import { UsersModule } from '../users/users.module';
@Module({
  imports: [
    RelationalCoursePersistenceModule,
    VideosModule,
    CloudinaryModule,
    TagsModule,
    CategoriesModule,
    CourseTagModule,
    CourseCategoryModule,
    UsersModule,
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService, RelationalCoursePersistenceModule],
})
export class CoursesModule {}
