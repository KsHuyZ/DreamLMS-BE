import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseCategoryDto } from './create-course-category.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCourseCategoryDto extends PartialType(
  CreateCourseCategoryDto,
) {
  @IsNotEmpty()
  @IsString()
  id: string;
}
