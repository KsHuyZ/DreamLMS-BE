// We use class-transformer in schema and domain entity.
// We duplicate these rules because you can choose not to use adapters
// in your project and return an schema entity directly in response.

import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { EnrollEntity } from '../../../../../enrolls/infrastructure/persistence/relational/entities/enroll.entity';
import { LessonEntity } from '../../../../../lessons/persistence/entities/lesson.entity';
import { LevelsEnum } from '../../../../types/levels.enum';
import { CourseStatusEnum } from '../../../../../statuses/statuses.enum';
import { TagEntity } from '../../../../../tags/persistence/entities/tag.entity';
import { CategoryEntity } from '../../../../../categories/persistence/entities/category.entity';
import { ImageEntity } from '../../../../../cloudinary/persistence/entities/image.entity';
import { CourseVideoEntity } from '../../../../../course-videos/infrastructure/persistence/relational/entities/course-video.entity';
import { RateEntity } from '../../../../../rates/infrastructure/persistence/relational/entities/rate.entity';
import { TransactionEntity } from '../../../../../transactions/infrastructure/persistence/relational/entities/transaction.entity';

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
  @OneToOne(() => ImageEntity, (image) => image.course, { cascade: true })
  @JoinColumn()
  image: ImageEntity;

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
  @ManyToOne(() => UserEntity, (user) => user.id, { nullable: false })
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
  @ManyToMany(() => CourseEntity, (course) => course.related)
  @JoinTable()
  related: CourseEntity[];

  @OneToMany(() => EnrollEntity, (enrolledCourse) => enrolledCourse.course)
  enrolledCourses: EnrollEntity[];

  @ApiResponseProperty({
    enum: CourseStatusEnum,
  })
  @Column({ enum: CourseStatusEnum, default: CourseStatusEnum.DRAFT })
  status: CourseStatusEnum;

  @OneToOne(() => CourseVideoEntity, (courseVideo) => courseVideo.course, {
    nullable: true,
  })
  @JoinColumn()
  courseVideo: CourseVideoEntity;

  @OneToMany(() => LessonEntity, (lessons) => lessons.course)
  lessons: LessonEntity[];

  @ManyToMany(() => TagEntity)
  @JoinTable({
    name: 'courseTag',
    joinColumn: {
      name: 'courseId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tagId',
      referencedColumnName: 'id',
    },
  })
  tags: TagEntity[];

  @ManyToMany(() => CategoryEntity, (category) => category.courses)
  categories: CategoryEntity[];

  @ApiResponseProperty()
  @OneToMany(() => RateEntity, (rate) => rate.course)
  rates: RateEntity[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiResponseProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiResponseProperty()
  @DeleteDateColumn()
  deletedAt: Date;

  @ApiResponseProperty()
  @Column('decimal', { nullable: true })
  ethPrice?: number;

  @ApiResponseProperty()
  @OneToMany(() => TransactionEntity, (transaction) => transaction.course)
  transactions: TransactionEntity[];
}
