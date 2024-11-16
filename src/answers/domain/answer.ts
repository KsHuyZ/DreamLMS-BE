import { ApiProperty } from '@nestjs/swagger';
import { Question } from '../../questions/domain/question';

export class Answer {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: String,
  })
  title: string;

  @ApiProperty()
  isCorrect: boolean;

  @ApiProperty()
  question: Question;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
