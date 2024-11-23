// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { EBoolean } from '../../videos/dto/create-video.dto';
import { VideoDto } from '../../videos/dto/video.dto';
import { LessonDto } from '../../lessons/dto/lesson.dto';

export class LessonVideoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  order: number;

  @ApiProperty()
  @IsNotEmpty()
  video: VideoDto;

  @ApiProperty()
  @IsNotEmpty()
  lesson: LessonDto;

  @ApiProperty()
  @IsEnum(EBoolean)
  isFree: EBoolean;
}
