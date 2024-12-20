import { ApiProperty } from '@nestjs/swagger';
import { CourseDto } from './course.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class CourseGuestDto extends CourseDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  duration: number;

  @ApiProperty()
  @IsOptional()
  isEnrolled?: boolean;

  @ApiProperty()
  @IsOptional()
  alreadyCart?: boolean;
}
