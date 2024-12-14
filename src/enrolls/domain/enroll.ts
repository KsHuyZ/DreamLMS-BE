import { ApiResponseProperty } from '@nestjs/swagger';
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
  user: User;

  @ApiResponseProperty({
    type: String,
  })
  course: Course;

  haveCertificate?: boolean;
}
