import { ApiProperty } from '@nestjs/swagger';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { TagEntity } from '../../../../../tags/persistence/entities/tag.entity';
import { CourseEntity } from '../../../../../courses/infrastructure/persistence/relational/entities/course.entity';

@Entity({
  name: 'courseCategory',
})
export class CourseTagEntity extends EntityRelationalHelper {
  @ApiProperty({
    type: String,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => TagEntity, (category) => category.courseTag)
  tag: TagEntity;

  @ManyToOne(() => CourseEntity, (course) => course.courseTag)
  course: CourseEntity;
}
