// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UserQuiz } from '../../user-quizzes/domain/user-quiz';
import { Question } from '../../questions/domain/question';
import { Answer } from '../../answers/domain/answer';

export class CreateUserQuizAnswerDto {
  @ApiProperty()
  @IsNotEmpty()
  userQuiz: UserQuiz;

  @ApiProperty()
  @IsNotEmpty()
  question: Question;

  @ApiProperty()
  @IsNotEmpty()
  answer: Answer;
}
