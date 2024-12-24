import { ApiProperty } from '@nestjs/swagger';
import { Course } from '../domain/course';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { User } from '../../users/domain/user';
import { Enroll } from '../../enrolls/domain/enroll';
import { Lesson } from '../../lessons/domain/lesson';
import { LevelsEnum } from '../types/levels.enum';
import { CourseStatusEnum } from '../../statuses/statuses.enum';
import { Tag } from '../../tags/domain/tag';
import { Category } from '../../categories/domain/category';
import { ImageDto } from '../../cloudinary/dto/image.dto';
import { CourseVideo } from '../../course-videos/domain/course-video';

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
  image: ImageDto;
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
  level: LevelsEnum;
  @ApiProperty()
  related: Course[];

  @ApiProperty()
  lessons: Lesson[];

  @ApiProperty()
  tags: Tag[];

  @ApiProperty()
  categories: Category[];

  @ApiProperty()
  enrolledCourses: Enroll[];

  courseVideo: CourseVideo;

  @ApiProperty()
  status: CourseStatusEnum;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;

  @ApiProperty()
  @IsDate()
  deletedAt: Date;

  @ApiProperty()
  @IsNumber()
  ethPrice?: number | undefined;
}
