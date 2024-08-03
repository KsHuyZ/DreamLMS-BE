import { ApiResponseProperty } from '@nestjs/swagger';
import { ManyToOne } from 'typeorm';
import { Course } from '../../courses/domain/course';
import { User } from '../../users/domain/user';

export class Enroll {
  @ApiResponseProperty({
    type: String,
  })
  id: string;

  @ApiResponseProperty({
    type: String,
  })
  @ManyToOne(() => User, (course) => course.enrolledCourses)
  user: User;

  @ApiResponseProperty({
    type: String,
  })
  @ManyToOne(() => Course, (course) => course.enrolledCourses)
  course: Course;
}
