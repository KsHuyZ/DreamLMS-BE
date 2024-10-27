import { ApiResponseProperty } from '@nestjs/swagger';

export class Category {
  @ApiResponseProperty({
    type: String,
  })
  id: string;

  @ApiResponseProperty({
    type: String,
  })
  name: string;

  @ApiResponseProperty({
    type: Date,
  })
  createdAt: Date;

  @ApiResponseProperty({
    type: Date,
  })
  updatedAt: Date;

  @ApiResponseProperty({
    type: Date,
  })
  deletedAt: Date;
}
