import { ApiResponseProperty } from '@nestjs/swagger';

export class Tag {
  @ApiResponseProperty({
    type: String,
  })
  id: string;

  @ApiResponseProperty({
    type: String,
  })
  name: string;
}
