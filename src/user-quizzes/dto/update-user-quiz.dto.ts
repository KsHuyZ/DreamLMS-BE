// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserQuizDto } from './create-user-quiz.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateUserQuizDto extends PartialType(CreateUserQuizDto) {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  score: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  isCompleted: boolean;
}
