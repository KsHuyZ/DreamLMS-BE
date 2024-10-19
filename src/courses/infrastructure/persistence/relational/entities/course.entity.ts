// We use class-transformer in schema and domain entity.
// We duplicate these rules because you can choose not to use adapters
// in your project and return an schema entity directly in response.

import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { EnrollEntity } from '../../../../../enrolls/infrastructure/persistence/relational/entities/enroll.entity';
import { LessonEntity } from '../../../../../lessons/persistence/entities/lesson.entity';
import { LevelsEnum } from '../../../../types/levels.enum';
import { StatusEnum } from '../../../../../statuses/statuses.enum';
import { CourseTagEntity } from '../../../../../course-tag/infrastructure/persistence/relational/entities/course-category.entity';

@Entity({
  name: 'courses',
})
export class CourseEntity extends EntityRelationalHelper {
  @ApiProperty({
    type: String,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: String,
    example: 'Tailwind from zero to hero',
  })
  @Column({ type: String, length: 200 })
  name: string;

  @ApiProperty({
    type: Number,
    example: '20.000đ',
  })
  @Column({ type: Number })
  price: number;

  @ApiProperty({
    type: String,
    example: 'https://example.com/path/to/file.jpg',
  })
  @Column({ type: String })
  image: string;

  @ApiProperty({
    type: String,
    example: 'https://example.com/path/to/file.mp4',
  })
  @Column({ type: String, nullable: true })
  videoPreview: string;

  @ApiProperty({
    type: String,
    example: 'this is description',
  })
  @Column({ type: String })
  description: string;

  @ApiProperty({
    type: String,
    example: 'this is short description',
  })
  @Column({ type: String })
  shortDescription: string;

  @ApiResponseProperty({
    type: String,
    example: 'abchsdgasdgsagdssasdaerrewr',
  })
  @ManyToOne(() => UserEntity, (user) => user.id)
  createdBy: UserEntity;

  @ApiResponseProperty({
    enum: LevelsEnum,
    example: LevelsEnum.BEGINNER,
  })
  @Column({ enum: LevelsEnum })
  level: LevelsEnum;

  @ApiResponseProperty({
    type: () => CourseEntity,
  })
  @OneToMany(() => CourseEntity, (course) => course.related)
  related: CourseEntity[];

  @ManyToMany(() => EnrollEntity, (enrolledCourse) => enrolledCourse.course)
  enrolledCourses: EnrollEntity[];

  @ApiResponseProperty({
    enum: StatusEnum,
  })
  status: StatusEnum;

  @ApiProperty({
    type: Boolean,
  })
  @Column({ type: Boolean, default: false })
  isDeleted: boolean;

  @OneToMany(() => LessonEntity, (lessons) => lessons.course)
  lessons: LessonEntity[];

  @OneToMany(() => CourseTagEntity, (courseTag) => courseTag.course)
  courseTag: CourseTagEntity[];

  @ApiProperty()
  @Column({ type: Date, default: new Date() })
  createdAt: Date;

  @ApiResponseProperty()
  @Column({ type: Date, default: new Date() })
  updatedAt: Date;

  @ApiResponseProperty()
  @Column({ type: Date, nullable: true })
  deletedAt?: Date | null;
}
