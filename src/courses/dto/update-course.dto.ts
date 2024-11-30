import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Image } from '../../cloudinary/domain/image';

export class UpdateCourseDto extends PartialType(
  OmitType(CreateCourseDto, ['image']),
) {
  @ApiProperty({
    type: String,
    format: 'binary',
    required: true,
  })
  image: Image | Express.Multer.File;
}
