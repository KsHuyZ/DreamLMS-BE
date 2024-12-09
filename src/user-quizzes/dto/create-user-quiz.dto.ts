// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Quiz } from '../../quizzes/domain/quiz';

export class CreateUserQuizDto {
  @ApiProperty()
  @IsNotEmpty()
  user: User;

  @ApiProperty()
  @IsNotEmpty()
  quiz: Quiz;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  score: number;
}
