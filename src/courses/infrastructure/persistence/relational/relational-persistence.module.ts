import { Module } from '@nestjs/common';
import { CourseRepository } from '../course.repository';
import { CoursesRelationalRepository } from './repositories/course.repostiory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity])],
  providers: [
    {
      provide: CourseRepository,
      useClass: CoursesRelationalRepository,
    },
  ],
  exports: [CourseRepository],
})
export class RelationalCoursePersistenceModule {}
