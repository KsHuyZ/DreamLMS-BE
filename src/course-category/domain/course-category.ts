import { ApiResponseProperty } from '@nestjs/swagger';
import { Course } from '../../courses/domain/course';
import { Category } from '../../categories/domain/category';

export class CourseCategory {
  @ApiResponseProperty({
    type: String,
  })
  id: string;

  @ApiResponseProperty({
    type: () => Course,
  })
  course: Course;

  @ApiResponseProperty({
    type: () => Category,
  })
  category: Category;

  @ApiResponseProperty()
  createdAt: Date;

  @ApiResponseProperty()
  updatedAt: Date;

  @ApiResponseProperty()
  deletedAt?: Date | null;
}
