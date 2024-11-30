import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Course } from '../../courses/domain/course';
import { User } from '../../users/domain/user';

export class CreateEnrollDto {
  @ApiProperty()
  @IsNotEmpty()
  course: Course;

  @ApiProperty()
  @IsNotEmpty()
  user: User;
}
