import { ApiProperty } from '@nestjs/swagger';
import { Video } from '../../videos/domain/video';
import { Course } from '../../courses/domain/course';

export class CourseVideo {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  course: Course;

  @ApiProperty()
  video: Video;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
