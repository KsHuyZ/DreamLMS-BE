// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateUserQuizDto } from './create-user-quiz.dto';

export class UpdateUserQuizDto extends PartialType(CreateUserQuizDto) {}
