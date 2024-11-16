// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { QuizType } from '../../quizzes/types/quiz.enum';
import { CreateAnswerDto } from '../../answers/dto/create-answer.dto';

export class CreateQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(QuizType)
  type: QuizType;

  @ApiProperty()
  @IsNotEmpty()
  quizId: string;

  @ApiProperty()
  answers: CreateAnswerDto[];
}
