import { Module } from '@nestjs/common';

import { CoursesController } from './courses.controller';

import { CoursesService } from './courses.service';
import { RelationalCoursePersistenceModule } from './infrastructure/persistence/relational/persistence.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { TagsModule } from '../tags/tag.module';
import { CategoriesModule } from '../categories/category.module';
import { UsersModule } from '../users/users.module';
import { CourseVideosModule } from '../course-videos/course-videos.module';
@Module({
  imports: [
    RelationalCoursePersistenceModule,
    CloudinaryModule,
    TagsModule,
    CategoriesModule,
    UsersModule,
    CourseVideosModule,
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService, RelationalCoursePersistenceModule],
})
export class CoursesModule {}
