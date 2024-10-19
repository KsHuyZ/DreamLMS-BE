import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';
import { CourseTag } from '../domain/course-tag';
import { Tag } from '../../tags/domain/tag';
import { Course } from '../../courses/domain/course';

export class CourseTagDto implements CourseTag {
  @ApiProperty()
  @IsString()
  id: string;
  @ApiProperty()
  course: Course;
  @ApiProperty()
  tag: Tag;
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
  deletedAt?: Date | null | undefined;
}
