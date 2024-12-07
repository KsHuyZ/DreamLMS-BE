import { forwardRef, Module } from '@nestjs/common';

import { LessonsService } from './lessons.service';
import { LessonPersistenceModule } from './persistence/persistence.module';
import { LessonsController } from './lessons.controller';
import { CoursesModule } from '../courses/courses.module';
import { UserVideosModule } from '../user-videos/user-videos.module';

@Module({
  imports: [
    LessonPersistenceModule,
    forwardRef(() => CoursesModule),
    forwardRef(() => UserVideosModule),
  ],
  providers: [LessonsService],
  controllers: [LessonsController],
  exports: [LessonsService, LessonPersistenceModule],
})
export class LessonsModule {}
