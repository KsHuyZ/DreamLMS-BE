import { ApiProperty } from '@nestjs/swagger';
import { User } from '../domain/user';
import { IsDate, IsString } from 'class-validator';
import { EnrollDto } from '../../enrolls/dto/enroll.dto';

export class UserDto implements User {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  provider: string;

  @ApiProperty()
  enrolledCourses: EnrollDto[];

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;

  @ApiProperty()
  @IsDate()
  deletedAt: Date;
}
