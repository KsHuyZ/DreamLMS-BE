import { Module } from '@nestjs/common';

import { LessonsService } from './lessons.service';
import { FilesModule } from '../files/files.module';
import { LessonPersistenceModule } from './persistence/persistence.module';
import { LessonsController } from './lessons.controller';
import { CoursesModule } from '../courses/courses.module';

@Module({
  imports: [LessonPersistenceModule, FilesModule, CoursesModule],
  providers: [LessonsService],
  controllers: [LessonsController],
  exports: [LessonsService, LessonPersistenceModule],
})
export class LessonsModule {}
