import { ApiProperty } from '@nestjs/swagger';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { CourseEntity } from '../../../../../courses/infrastructure/persistence/relational/entities/course.entity';
import { CategoryEntity } from '../../../../../categories/persistence/entities/category.entity';

@Entity({
  name: 'courseTag',
})
export class CourseCategoryEntity extends EntityRelationalHelper {
  @ApiProperty({
    type: String,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CategoryEntity, (category) => category.courseCategory)
  category: CategoryEntity;

  @ManyToOne(() => CourseEntity, (course) => course.courseTag)
  course: CourseEntity;
}
