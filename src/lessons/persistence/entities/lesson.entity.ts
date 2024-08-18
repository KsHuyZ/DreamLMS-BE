// We use class-transformer in schema and domain entity.
// We duplicate these rules because you can choose not to use adapters
// in your project and return an schema entity directly in response.

import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EntityRelationalHelper } from '../../../utils/relational-entity-helper';
import { CourseEntity } from '../../../courses/infrastructure/persistence/relational/entities/course.entity';

@Entity({
  name: 'lessons',
})
export class LessonEntity extends EntityRelationalHelper {
  @ApiProperty({
    type: String,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: String,
  })
  @Column()
  name: string;

  @ApiProperty({
    type: Number,
  })
  @Column()
  order: number;

  @ApiProperty({
    type: String,
  })
  @Column()
  description: string;

  @ApiProperty({
    type: () => CourseEntity,
  })
  @ManyToOne(() => CourseEntity, (course) => course.lessons)
  course: CourseEntity;

  @ApiProperty({
    type: Boolean,
    example: false,
    default: true,
  })
  @Column()
  isPublic: boolean;
}
