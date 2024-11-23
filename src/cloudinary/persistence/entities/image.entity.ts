import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../utils/relational-entity-helper';
import { CourseEntity } from '../../../courses/infrastructure/persistence/relational/entities/course.entity';
import { UserEntity } from '../../../users/infrastructure/persistence/relational/entities/user.entity';

@Entity({
  name: 'images',
})
export class ImageEntity extends EntityRelationalHelper {
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
  @Column()
  url: string;

  @ApiProperty({
    type: String,
  })
  @Column()
  publicId: string;

  @ApiProperty({
    type: String,
  })
  @Column()
  format: string;

  @ApiProperty({
    type: String,
  })
  @Column('float')
  size: number;

  @OneToOne(() => CourseEntity, (course) => course.image)
  course: CourseEntity;

  @ManyToOne(() => UserEntity)
  createdBy: UserEntity;
}
