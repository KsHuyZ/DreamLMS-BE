import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';
import { Course } from '../../courses/domain/course';
import { AmountUnit } from '../types/amount.unit';

export class Transaction {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  user: User;

  @ApiProperty()
  course: Course;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  amountUnit: AmountUnit;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
