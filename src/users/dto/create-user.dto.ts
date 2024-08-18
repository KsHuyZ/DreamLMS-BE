import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';
import { RoleEnum } from '../../roles/roles.enum';
import { StatusEnum } from '../../statuses/statuses.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'test1@example.com', type: String })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @IsEmail()
  email: string | null;

  @ApiProperty()
  @MinLength(6)
  password?: string;

  provider?: string;

  socialId?: string | null;

  @ApiProperty({ example: 'John', type: String })
  @IsNotEmpty()
  firstName: string | null;

  @ApiProperty({ example: 'Doe', type: String })
  @IsNotEmpty()
  lastName: string | null;

  @ApiPropertyOptional({ enum: RoleEnum })
  @IsOptional()
  role?: RoleEnum;

  @ApiPropertyOptional({ enum: StatusEnum })
  @IsOptional()
  status?: StatusEnum;

  hash?: StatusEnum | null;
}
