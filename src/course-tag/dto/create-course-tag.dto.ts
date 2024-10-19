import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CourseDto } from '../../courses/dto/course.dto';
import { TagDto } from '../../tags/dto/tag.dto';

export class CreateCourseTagDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    type: () => TagDto,
  })
  @IsNotEmpty()
  tag: TagDto;

  @ApiProperty({
    type: () => CourseDto,
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  course: CourseDto;
}
