import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EntityRelationalHelper } from '../../../utils/relational-entity-helper';
import { CourseTagEntity } from '../../../course-tag/infrastructure/persistence/relational/entities/course-tag.entity';

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
  @OneToMany(() => CourseTagEntity, (courseTag) => courseTag.tag)
  courseTag: CourseTagEntity[];
}
