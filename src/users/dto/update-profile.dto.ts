import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { UpdateUserDto } from './update-user.dto';

export class UpdateProfileDto extends UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsOptional()
  x?: string;

  @ApiProperty()
  @IsOptional()
  github?: string;

  @ApiProperty()
  @IsOptional()
  facebook?: string;

  @ApiProperty()
  @IsOptional()
  instagram?: string;

  @ApiProperty()
  @IsOptional()
  walletAddress?: string;
}
