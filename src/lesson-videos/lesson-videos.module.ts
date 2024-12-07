import { forwardRef, Module } from '@nestjs/common';
import { LessonVideosService } from './lesson-videos.service';
import { LessonVideosController } from './lesson-videos.controller';
import { RelationalLessonVideoPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { VideosModule } from '../videos/videos.module';
import { LessonsModule } from '../lessons/lessons.module';

@Module({
  imports: [
    RelationalLessonVideoPersistenceModule,
    VideosModule,
    forwardRef(() => LessonsModule),
  ],
  controllers: [LessonVideosController],
  providers: [LessonVideosService],
  exports: [LessonVideosService, RelationalLessonVideoPersistenceModule],
})
export class LessonVideosModule {}
