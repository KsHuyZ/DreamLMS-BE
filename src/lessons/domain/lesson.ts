import { ApiResponseProperty } from '@nestjs/swagger';
import { ManyToOne } from 'typeorm';
import { Course } from '../../courses/domain/course';

export class Lesson {
  @ApiResponseProperty({
    type: String,
  })
  id: string;

  @ApiResponseProperty({
    type: String,
  })
  name: string;

  @ApiResponseProperty({
    type: Number,
  })
  order: number;

  @ApiResponseProperty({
    type: String,
  })
  description: string;

  @ApiResponseProperty({
    type: Course,
  })
  @ManyToOne(() => Course, (course) => course.lessons)
  course: Course;

  @ApiResponseProperty({
    type: Boolean,
  })
  isPublic: boolean;
}
