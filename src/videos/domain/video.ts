import { ApiProperty } from '@nestjs/swagger';
import { Lesson } from '../../lessons/domain/lesson';

export class Video {
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

  @ApiProperty({
    type: String,
  })
  videoId: string;

  @ApiProperty({
    type: Number,
  })
  order: number;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  lesson: Lesson;

  @ApiProperty()
  isFree: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
