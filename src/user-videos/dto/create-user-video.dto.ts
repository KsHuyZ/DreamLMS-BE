// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserVideoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  videoId: string;
}
