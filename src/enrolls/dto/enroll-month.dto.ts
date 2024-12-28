import { IsNotEmpty, IsNumber } from 'class-validator';

export class EnrollMonthDto {
  @IsNotEmpty()
  @IsNumber()
  count: number;

  @IsNotEmpty()
  @IsNumber()
  percent: number;
}
