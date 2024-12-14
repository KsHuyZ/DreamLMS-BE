import { ApiProperty } from '@nestjs/swagger';
import { CourseDto } from './course.dto';
import { IsBoolean, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class CourseLearningDto extends CourseDto {
  @ApiProperty()
  @IsNumber()
  @Transform(({ value }) => Math.round(value))
  progress: number;

  @ApiProperty()
  @IsBoolean()
  haveCertificate?: boolean;
}
