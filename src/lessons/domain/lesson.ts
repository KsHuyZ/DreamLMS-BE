import { ApiResponseProperty } from '@nestjs/swagger';
import { Course } from '../../courses/domain/course';
import { Video } from '../../videos/domain/video';
import { Quiz } from '../../quizzes/domain/quiz';

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
    type: () => Course,
  })
  course: Course;

  @ApiResponseProperty()
  disabled: boolean;

  @ApiResponseProperty()
  videos: Video[];

  @ApiResponseProperty()
  quizzes: Quiz[];
}
