import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EntityRelationalHelper } from '../../../utils/relational-entity-helper';
import { CourseEntity } from '../../../courses/infrastructure/persistence/relational/entities/course.entity';

@Entity({
  name: 'categories',
})
export class CategoryEntity extends EntityRelationalHelper {
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
  @OneToMany(() => CourseEntity, (course) => course.categories)
  courses: CourseEntity[];
}
