import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';
import { Course } from '../../courses/domain/course';

export class Rate {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  star: number;

  @ApiProperty()
  comment: string;

  @ApiProperty()
  user: User;

  @ApiProperty()
  course: Course;

  @ApiProperty()
  updatedAt: Date;
}
