import { Module } from '@nestjs/common';
import { CourseVideoRepository } from '../course-video.repository';
import { CourseVideoRelationalRepository } from './repositories/course-video.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseVideoEntity } from './entities/course-video.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseVideoEntity])],
  providers: [
    {
      provide: CourseVideoRepository,
      useClass: CourseVideoRelationalRepository,
    },
  ],
  exports: [CourseVideoRepository],
})
export class RelationalCourseVideoPersistenceModule {}
