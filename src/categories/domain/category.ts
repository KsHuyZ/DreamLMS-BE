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
}
