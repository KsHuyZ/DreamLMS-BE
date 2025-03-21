// We use class-transformer in schema and domain entity.
// We duplicate these rules because you can choose not to use adapters
// in your project and return an schema entity directly in response.

import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { CourseEntity } from '../../../../../courses/infrastructure/persistence/relational/entities/course.entity';

@Entity({
  name: 'related-course',
})
export class RelatedCourseEntity extends EntityRelationalHelper {
  @ApiProperty({
    type: String,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: () => String,
  })
  @PrimaryColumn()
  courseId: string;

  @ApiProperty({
    type: () => CourseEntity,
  })
  @ManyToOne(() => CourseEntity, (course) => course.related)
  relatedCourse: CourseEntity;
}
