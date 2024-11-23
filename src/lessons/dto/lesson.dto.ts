import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CourseDto } from '../../courses/dto/course.dto';

export class LessonDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ example: 'React from zero to hero', type: String })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'this is description',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  course: CourseDto;
}
