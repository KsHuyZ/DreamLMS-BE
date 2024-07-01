import { Status } from '../../statuses/domain/status';
import { ApiResponseProperty } from '@nestjs/swagger';

export class Course {
  @ApiResponseProperty({
    type: String,
  })
  id: number | string;

  @ApiResponseProperty({
    type: String,
    example: 'Tailwind from zero to hero',
  })
  name: string;

  @ApiResponseProperty({
    type: Number,
    example: '20.000đ',
  })
  price: number;

  @ApiResponseProperty({
    type: String,
    example: 'https://example.com/path/to/file.jpg',
  })
  image: string;

  @ApiResponseProperty({
    type: String,
    example: 'https://example.com/path/to/file.mp4',
  })
  videoPreview: string;

  @ApiResponseProperty({
    type: String,
    example: 'this is description',
  })
  description: string;

  @ApiResponseProperty({
    type: String,
    example: 'this is short description',
  })
  shortDescription: string;

  @ApiResponseProperty({
    type: String,
    example: 'abchsdgasdgsagdssasdaerrewr',
  })
  createdBy: string;

  @ApiResponseProperty({
    type: String,
    example: 'abchsdgasdgsagdssasdaerrewr',
  })
  levelId: string;

  @ApiResponseProperty({
    type: () => Course,
  })
  related: Course;

  @ApiResponseProperty({
    type: () => Status,
  })
  status?: Status;

  @ApiResponseProperty()
  createdAt: Date;

  @ApiResponseProperty()
  updatedAt: Date;

  @ApiResponseProperty()
  deletedAt: Date;
}
