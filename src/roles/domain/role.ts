import { ApiResponseProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class Role {
  @Allow()
  @ApiResponseProperty({
    type: String,
  })
  id: string;

  @Allow()
  @ApiResponseProperty({
    type: String,
    example: 'admin',
  })
  name?: string;
}
