// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { AmountUnit } from '../types/amount.unit';
import { User } from '../../users/domain/user';
import { Course } from '../../courses/domain/course';

export class CreateTransactionDto {
  @IsNotEmpty()
  user: User;

  @IsNotEmpty()
  course: Course;

  @IsNotEmpty()
  @Transform(({ value }) => (value ? Number(value) : 1))
  amount: number;

  @IsNotEmpty()
  amountUnit: AmountUnit;
}
