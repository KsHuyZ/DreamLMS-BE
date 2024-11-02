// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateVideoDto } from './create-video.dto';
import { IsString } from 'class-validator';

export class UpdateVideoDto extends PartialType(CreateVideoDto) {
  @ApiProperty({ type: String })
  @IsString()
  id: string;
}
