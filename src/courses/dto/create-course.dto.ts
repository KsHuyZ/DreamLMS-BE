import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CourseDto } from './course.dto';
import { LevelsEnum } from '../types/levels.enum';
import { StatusEnum } from '../../statuses/statuses.enum';

export class CreateCourseDto {
  @ApiProperty({ example: 'React from zero to hero', type: String })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: Number,
    example: '200000',
  })
  price: number;

  @ApiProperty({
    description: 'Image file',
    type: 'string',
    format: 'binary',
  })
  @IsNotEmpty()
  image: Express.Multer.File;

  @ApiProperty({
    description: 'Video file',
    type: 'string',
    format: 'binary',
  })
  @IsNotEmpty()
  videoPreview: Express.Multer.File;

  @ApiProperty({
    type: String,
    example: 'this is short description',
  })
  shortDescription: string;

  @ApiProperty({
    type: String,
    example: 'this is description',
  })
  description: string;

  @ApiProperty({
    type: String,
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  createdBy: string;

  @ApiProperty({
    enum: LevelsEnum,
    example: LevelsEnum.BEGINNER,
  })
  level: LevelsEnum;

  @ApiProperty({
    type: [CourseDto],
    example: [
      '550e8400-e29b-41d4-a716-446655440000',
      '550e8400-e29b-41d4-a716-446655440000',
    ],
  })
  related: CourseDto[];

  @ApiProperty({
    enum: StatusEnum,
    example: StatusEnum.ACTIVE,
  })
  status: StatusEnum;
}
