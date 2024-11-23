import { ApiResponseProperty } from '@nestjs/swagger';
import { Course } from '../../courses/domain/course';
import { User } from '../../users/domain/user';

export class Image {
  @ApiResponseProperty({
    type: String,
  })
  id: string;

  @ApiResponseProperty({
    type: String,
  })
  name: string;

  @ApiResponseProperty({
    type: String,
  })
  url: string;

  @ApiResponseProperty({
    type: () => Course,
  })
  course: Course;

  @ApiResponseProperty({
    type: String,
  })
  publicId: string;

  @ApiResponseProperty({
    type: String,
  })
  format: string;

  @ApiResponseProperty({
    type: Number,
  })
  size: number;

  @ApiResponseProperty()
  createdBy: User;
}
