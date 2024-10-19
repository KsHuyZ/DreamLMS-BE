import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EntityRelationalHelper } from '../../../utils/relational-entity-helper';
import { CourseCategoryEntity } from '../../../course-category/infrastructure/persistence/relational/entities/course-category.entity';

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
  @OneToMany(
    () => CourseCategoryEntity,
    (courseCategory) => courseCategory.category,
  )
  courseCategory: CourseCategoryEntity[];
}
