// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateQuestionDto } from '../../questions/dto/create-question.dto';

export class CreateQuizDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lessonId: string;

  @ApiProperty()
  @IsNotEmpty()
  questions: CreateQuestionDto[];

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  time: number;
}
