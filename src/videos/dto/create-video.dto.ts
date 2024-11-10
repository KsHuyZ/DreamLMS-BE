// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export enum EBoolean {
  TRUE = 'true',
  FALSE = 'false',
}

export class CreateVideoDto {
  @ApiProperty({ example: 'React from zero to hero', type: String })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'This is description', type: String })
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  lessonId: string;

  @ApiProperty()
  @IsEnum(EBoolean)
  isFree: EBoolean;
}
