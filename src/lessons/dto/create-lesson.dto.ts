import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateLessonDto {
  @ApiProperty({ example: 'React from zero to hero', type: String })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  order: number;

  @ApiProperty({
    type: String,
    example: 'this is description',
  })
  description: string;

  @ApiProperty({
    type: Boolean,
    example: false,
  })
  isPublic: boolean;
}
