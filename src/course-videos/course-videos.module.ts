import { Module } from '@nestjs/common';
import { CourseVideosService } from './course-videos.service';
import { CourseVideosController } from './course-videos.controller';
import { RelationalCourseVideoPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { VideosModule } from '../videos/videos.module';

@Module({
  imports: [RelationalCourseVideoPersistenceModule, VideosModule],
  controllers: [CourseVideosController],
  providers: [CourseVideosService],
  exports: [CourseVideosService, RelationalCourseVideoPersistenceModule],
})
export class CourseVideosModule {}
