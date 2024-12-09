import { ApiProperty } from '@nestjs/swagger';
import { UserQuiz } from '../../user-quizzes/domain/user-quiz';
import { Question } from '../../questions/domain/question';
import { Answer } from '../../answers/domain/answer';

export class UserQuizAnswer {
  @ApiProperty()
  id: string;

  @ApiProperty()
  question: Question;

  @ApiProperty()
  answer: Answer;

  @ApiProperty()
  userQuiz: UserQuiz;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
