import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';
import { CourseDto } from './course.dto';

export class UpdateCourseDto {
  @ApiProperty({ example: 'React from zero to hero', type: String })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: Number,
    example: '200000',
  })
  price: number;

  @ApiProperty({
    type: String,
  })
  image: string;

  @ApiProperty({
    type: String,
  })
  videoPreview: string;

  @ApiProperty({
    type: String,
    example: 'this is short description',
  })
  shortDescription: string;

  @ApiProperty({
    type: String,
    example: 'abchsdgasdgsagdssasdaerrewr',
  })
  createdBy: string;

  @ApiProperty({
    type: String,
    example: 'abchsdgasdgsagdssasdaerrewr',
  })
  levelId: string;

  @ApiProperty({
    type: [CourseDto],
  })
  related: CourseDto[];
}
