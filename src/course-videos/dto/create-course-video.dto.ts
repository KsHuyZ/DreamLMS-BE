// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from '../../users/domain/user';
import { Course } from '../../courses/domain/course';

export class CreateCourseVideoDto {
  @ApiProperty()
  @IsNotEmpty()
  course: Course;

  @ApiProperty()
  @IsNotEmpty()
  createdBy: User;

  @ApiProperty()
  @IsNotEmpty()
  video: Express.Multer.File;
}
