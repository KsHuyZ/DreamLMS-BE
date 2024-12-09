import { forwardRef, Module } from '@nestjs/common';

import { LessonsService } from './lessons.service';
import { LessonPersistenceModule } from './persistence/persistence.module';
import { LessonsController } from './lessons.controller';
import { CoursesModule } from '../courses/courses.module';
import { UserVideosModule } from '../user-videos/user-videos.module';
import { UserQuizzesModule } from '../user-quizzes/user-quizzes.module';

@Module({
  imports: [
    LessonPersistenceModule,
    forwardRef(() => CoursesModule),
    forwardRef(() => UserVideosModule),
    forwardRef(() => UserQuizzesModule),
  ],
  providers: [LessonsService],
  controllers: [LessonsController],
  exports: [LessonsService, LessonPersistenceModule],
})
export class LessonsModule {}
