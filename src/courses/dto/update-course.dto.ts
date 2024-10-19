import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateCourseDto extends PartialType(
  OmitType(CreateCourseDto, ['image']),
) {
  @ApiProperty({
    type: String,
    format: 'binary',
    required: true,
  })
  @IsNotEmpty()
  image: string | Express.Multer.File;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: true,
  })
  @IsNotEmpty()
  videoPreview: string | Express.Multer.File;
}
