// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateLessonVideoDto } from './create-lesson-video.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Video } from '../../videos/domain/video';

export class UpdateLessonVideoDto extends PartialType(CreateLessonVideoDto) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsNumber()
  order: number;

  @ApiProperty()
  video: Express.Multer.File | Video;
}
