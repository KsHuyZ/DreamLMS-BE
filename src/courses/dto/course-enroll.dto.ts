import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CourseEnrollDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  courseId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;
}
