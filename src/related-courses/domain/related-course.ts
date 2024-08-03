import { ApiResponseProperty } from '@nestjs/swagger';
import { ManyToOne } from 'typeorm';
import { Course } from '../../courses/domain/course';

export class RelatedCourse {
  @ApiResponseProperty({
    type: String,
  })
  id: string;

  @ApiResponseProperty({
    type: String,
  })
  courseId: string;

  @ApiResponseProperty({
    type: Course,
  })
  @ManyToOne(() => Course, (course) => course.related)
  relatedCourse: Course;
}
