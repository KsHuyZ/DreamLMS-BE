import { ManyToMany, OneToMany } from 'typeorm';
import { Status } from '../../statuses/domain/status';
import { ApiResponseProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';
import { Enroll } from '../../enrolls/domain/enroll';

export class Course {
  @ApiResponseProperty({
    type: String,
  })
  id: string;

  @ApiResponseProperty({
    type: String,
    example: 'Tailwind from zero to hero',
  })
  name: string;

  @ApiResponseProperty({
    type: Number,
    example: '20.000đ',
  })
  price: number;

  @ApiResponseProperty({
    type: String,
    example: 'https://example.com/path/to/file.jpg',
  })
  image: string;

  @ApiResponseProperty({
    type: String,
    example: 'https://example.com/path/to/file.mp4',
  })
  videoPreview: string;

  @ApiResponseProperty({
    type: String,
    example: 'this is description',
  })
  description: string;

  @ApiResponseProperty({
    type: String,
    example: 'this is short description',
  })
  shortDescription: string;

  @ApiResponseProperty({
    type: () => User,
    example: 'abchsdgasdgsagdssasdaerrewr',
  })
  createdBy: User;

  @ApiResponseProperty({
    type: String,
    example: 'abchsdgasdgsagdssasdaerrewr',
  })
  levelId: string;

  @OneToMany(() => Course, (course) => course.related)
  related: Course[];

  @ManyToMany(() => Enroll, (enrolledCourse) => enrolledCourse.course)
  enrolledCourses: Enroll[];

  @ApiResponseProperty({
    type: () => Status,
  })
  status: Status;

  @ApiResponseProperty({
    type: () => Boolean,
  })
  isDeleted: boolean;

  @ApiResponseProperty()
  createdAt: Date;

  @ApiResponseProperty()
  updatedAt: Date;

  @ApiResponseProperty()
  deletedAt?: Date | null;
}
