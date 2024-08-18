import { Module } from '@nestjs/common';

import { LessonsService } from './lessons.service';
import { FilesModule } from '../files/files.module';
import { LessonPersistenceModule } from './persistence/persistence.module';

@Module({
  imports: [LessonPersistenceModule, FilesModule],
  providers: [LessonsService],
  exports: [LessonsService, LessonPersistenceModule],
})
export class LessonsModule {}
