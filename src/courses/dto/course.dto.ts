import { ApiProperty } from '@nestjs/swagger';
import { Course } from '../domain/course';
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Status } from '../../statuses/domain/status';
import { User } from '../../users/domain/user';
import { Enroll } from '../../enrolls/domain/enroll';

export class CourseDto implements Course {
  @ApiProperty()
  @IsString()
  id: string;
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNumber()
  price: number;
  @ApiProperty()
  @IsString()
  image: string;
  @ApiProperty()
  @IsString()
  videoPreview: string;
  @ApiProperty()
  @IsString()
  description: string;
  @ApiProperty()
  @IsString()
  shortDescription: string;
  @ApiProperty()
  createdBy: User;
  @ApiProperty()
  @IsString()
  levelId: string;
  @ApiProperty()
  related: Course[];

  @ApiProperty()
  enrolledCourses: Enroll[];

  @ApiProperty()
  status: Status;
  @ApiProperty()
  @IsBoolean()
  isDeleted: boolean;
  @ApiProperty()
  @IsDate()
  createdAt: Date;
  @ApiProperty()
  @IsDate()
  updatedAt: Date;
  @ApiProperty()
  @IsDate()
  @IsOptional()
  deletedAt?: Date | null | undefined;
}
