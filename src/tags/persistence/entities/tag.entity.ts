import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EntityRelationalHelper } from '../../../utils/relational-entity-helper';
import { CourseEntity } from '../../../courses/infrastructure/persistence/relational/entities/course.entity';

@Entity({
  name: 'tags',
})
export class TagEntity extends EntityRelationalHelper {
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
    type: String,
  })
  @ManyToMany(() => CourseEntity, (course) => course.tags)
  courses: CourseEntity[];
}
