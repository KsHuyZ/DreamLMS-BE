import { Module } from '@nestjs/common';
import { LessonVideoRepository } from '../lesson-video.repository';
import { LessonVideoRelationalRepository } from './repositories/lesson-video.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonVideoEntity } from './entities/lesson-video.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LessonVideoEntity])],
  providers: [
    {
      provide: LessonVideoRepository,
      useClass: LessonVideoRelationalRepository,
    },
  ],
  exports: [LessonVideoRepository],
})
export class RelationalLessonVideoPersistenceModule {}
