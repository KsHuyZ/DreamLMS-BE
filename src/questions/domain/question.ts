import { ApiProperty } from '@nestjs/swagger';
import { QuizType } from '../../quizzes/types/quiz.enum';
import { Quiz } from '../../quizzes/domain/quiz';
import { Answer } from '../../answers/domain/answer';

export class Question {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: String,
  })
  title: string;

  @ApiProperty({
    enum: QuizType,
  })
  type: QuizType;

  @ApiProperty()
  quiz: Quiz;

  @ApiProperty()
  answers: Answer[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
