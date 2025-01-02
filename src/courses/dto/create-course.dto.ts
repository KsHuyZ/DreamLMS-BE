import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { LevelsEnum } from '../types/levels.enum';
import { User } from '../../users/domain/user';
import { Transform } from 'class-transformer';

export class CreateCourseDto {
  @ApiProperty({ example: 'React from zero to hero', type: String })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: Number,
    example: '200000',
  })
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : 0))
  price: number;

  @ApiProperty({
    description: 'Image file',
    type: 'string',
    format: 'binary',
  })
  image: Express.Multer.File;

  @ApiProperty({
    type: String,
    example: 'this is short description',
  })
  @IsNotEmpty()
  shortDescription: string;

  @ApiProperty({
    type: String,
    example: 'this is description',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    enum: LevelsEnum,
    example: LevelsEnum.BEGINNER,
  })
  @IsNotEmpty()
  level: LevelsEnum;

  @ApiProperty({
    type: [String],
    example: ['React'],
  })
  @IsNotEmpty()
  tags: string;

  @ApiProperty({
    type: [String],
    example: ['Frontend'],
  })
  @IsNotEmpty()
  categories: string;

  @ApiProperty()
  createdBy: User;

  @ApiProperty()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  ethPrice: number;
}
