import { ApiProperty } from '@nestjs/swagger';
import { Lesson } from '../../lessons/domain/lesson';
import { Video } from '../../videos/domain/video';

export class LessonVideo {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: String,
  })
  title: string;

  @ApiProperty({
    type: String,
  })
  description: string;

  @ApiProperty()
  order: number;

  @ApiProperty()
  video: Video;

  @ApiProperty()
  isFree: boolean;

  @ApiProperty()
  lesson: Lesson;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
