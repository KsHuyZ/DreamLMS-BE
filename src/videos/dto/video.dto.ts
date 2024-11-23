// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { LessonDto } from '../../lessons/dto/lesson.dto';

export class VideoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'React from zero to hero' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'This is description', type: String })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  videoId: string;

  @ApiProperty()
  @IsNotEmpty()
  lesson: LessonDto;
}
