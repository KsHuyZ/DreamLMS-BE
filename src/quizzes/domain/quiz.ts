import { ApiProperty } from '@nestjs/swagger';
import { Lesson } from '../../lessons/domain/lesson';
import { Question } from '../../questions/domain/question';

export class Quiz {
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
    type: Number,
  })
  order: number;

  @ApiProperty()
  time: number;

  @ApiProperty()
  disabled: boolean;

  @ApiProperty()
  lesson: Lesson;

  @ApiProperty()
  questions: Question[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
