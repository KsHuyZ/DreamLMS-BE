import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ImageDto } from '../../cloudinary/dto/image.dto';

export class UpdateCourseDto extends PartialType(
  OmitType(CreateCourseDto, ['image']),
) {
  @ApiProperty({
    type: String,
    format: 'binary',
    required: true,
  })
  @IsNotEmpty()
  image: ImageDto | Express.Multer.File;
}
