import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CourseDto } from '../../courses/dto/course.dto';

export class CreateCourseRelatedDto {
  @ApiProperty({
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  courseId: string;

  @ApiProperty({
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiProperty({
    type: CourseDto,
  })
  @IsNotEmpty()
  relatedCourse: CourseDto;
}
