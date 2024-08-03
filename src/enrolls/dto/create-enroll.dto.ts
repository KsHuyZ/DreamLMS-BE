import { IsNotEmpty } from 'class-validator';
import { UserDto } from '../../users/dto/user.dto';
import { CourseDto } from '../../courses/dto/course.dto';

export class CreateEnrollDto {
  @IsNotEmpty()
  user: UserDto;

  @IsNotEmpty()
  course: CourseDto;
}
