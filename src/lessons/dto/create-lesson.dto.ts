import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateLessonDto {
  @ApiProperty({ example: 'React from zero to hero', type: String })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    example: 'this is description',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  courseId: string;
}
