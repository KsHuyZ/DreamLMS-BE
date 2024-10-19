import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseTagDto } from './create-course-tag.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCourseTagDto extends PartialType(CreateCourseTagDto) {
  @IsNotEmpty()
  @IsString()
  id: string;
}
