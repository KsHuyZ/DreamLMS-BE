import { ApiResponseProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';
import { Enroll } from '../../enrolls/domain/enroll';
import { Lesson } from '../../lessons/domain/lesson';
import { LevelsEnum } from '../types/levels.enum';
import { CourseStatusEnum } from '../../statuses/statuses.enum';
import { Category } from '../../categories/domain/category';
import { Tag } from '../../tags/domain/tag';
import { Image } from '../../cloudinary/domain/image';
import { CourseVideo } from '../../course-videos/domain/course-video';
import { ManyToMany, OneToMany } from 'typeorm';

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
  image: Image;

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
    enum: LevelsEnum,
    example: LevelsEnum.BEGINNER,
  })
  level: LevelsEnum;

  courseVideo: CourseVideo;

  @OneToMany(() => Course, (course) => course.related)
  related: Course[];

  @ManyToMany(() => Enroll, (enrolledCourse) => enrolledCourse.course)
  enrolledCourses: Enroll[];

  @OneToMany(() => Lesson, (lessons) => lessons.course)
  lessons: Lesson[];

  @ApiResponseProperty({
    enum: CourseStatusEnum,
    example: CourseStatusEnum.PUBLIC,
  })
  status: CourseStatusEnum;

  @ApiResponseProperty()
  createdAt: Date;

  @ApiResponseProperty()
  updatedAt: Date;

  @ApiResponseProperty()
  deletedAt: Date;

  @ApiResponseProperty()
  tags: Tag[];

  @ApiResponseProperty()
  categories: Category[];
}
