import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';
import { CourseCategory } from '../domain/course-category';
import { Course } from '../../courses/domain/course';
import { Category } from '../../categories/domain/category';

export class CourseCategoryDto implements CourseCategory {
  @ApiProperty()
  @IsString()
  id: string;
  @ApiProperty()
  course: Course;
  @ApiProperty()
  category: Category;
  @ApiProperty()
  @IsBoolean()
  isDeleted: boolean;
  @ApiProperty()
  @IsDate()
  createdAt: Date;
  @ApiProperty()
  @IsDate()
  updatedAt: Date;
  @ApiProperty()
  @IsDate()
  @IsOptional()
  deletedAt?: Date | null;
}
