import { Module } from '@nestjs/common';
import { LessonRepository } from '../persistence/lesson.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonRelationalRepository } from './repositories/lesson.repository';
import { LessonEntity } from './entities/lesson.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LessonEntity])],
  providers: [
    {
      provide: LessonRepository,
      useClass: LessonRelationalRepository,
    },
  ],
  exports: [LessonRepository],
})
export class LessonPersistenceModule {}
