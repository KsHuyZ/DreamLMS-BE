import { ApiResponseProperty } from '@nestjs/swagger';
import { Course } from '../../courses/domain/course';
import { Tag } from '../../tags/domain/tag';

export class CourseTag {
  @ApiResponseProperty({
    type: String,
  })
  id: string;

  @ApiResponseProperty({
    type: () => Course,
  })
  course: Course;

  @ApiResponseProperty({
    type: () => Tag,
  })
  tag: Tag;

  @ApiResponseProperty()
  createdAt: Date;

  @ApiResponseProperty()
  updatedAt: Date;

  @ApiResponseProperty()
  deletedAt?: Date | null;
}
