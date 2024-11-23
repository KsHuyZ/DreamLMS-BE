import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AdditionCourseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  related: string;
}
