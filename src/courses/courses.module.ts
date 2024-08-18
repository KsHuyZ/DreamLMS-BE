import { Module } from '@nestjs/common';

import { CoursesController } from './courses.controller';

import { CoursesService } from './courses.service';
import { RelationalCoursePersistenceModule } from './infrastructure/persistence/relational/persistence.module';
import { VideosModule } from '../videos/videos.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [RelationalCoursePersistenceModule, VideosModule, CloudinaryModule],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService, RelationalCoursePersistenceModule],
})
export class CoursesModule {}
