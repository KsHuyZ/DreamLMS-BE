import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryDto {
  @ApiProperty()
  @IsString()
  id: string;
  @ApiProperty({ example: 'React from zero to hero', type: String })
  @IsNotEmpty()
  name: string;
}
