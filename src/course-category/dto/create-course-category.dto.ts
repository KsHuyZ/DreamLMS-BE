import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CategoryDto } from '../../categories/dto/category.dto';
import { CourseDto } from '../../courses/dto/course.dto';

export class CreateCourseCategoryDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    type: String,
  })
  @IsNotEmpty()
  category: CategoryDto;

  @ApiProperty({
    type: String,
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  course: CourseDto;
}
