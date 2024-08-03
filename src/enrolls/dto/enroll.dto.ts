import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Enroll } from '../domain/enroll';
import { UserDto } from '../../users/dto/user.dto';
import { CourseDto } from '../../courses/dto/course.dto';

export class EnrollDto extends Enroll {
  @ApiProperty()
  @IsString()
  id: string;

  @IsNotEmpty()
  user: UserDto;

  @IsNotEmpty()
  course: CourseDto;
}
