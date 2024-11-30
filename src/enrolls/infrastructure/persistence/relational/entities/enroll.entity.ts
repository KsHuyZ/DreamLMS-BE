// We use class-transformer in schema and domain entity.
// We duplicate these rules because you can choose not to use adapters
// in your project and return an schema entity directly in response.

import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { CourseEntity } from '../../../../../courses/infrastructure/persistence/relational/entities/course.entity';

@Entity({
  name: 'enrolls',
})
export class EnrollEntity extends EntityRelationalHelper {
  @ApiProperty({
    type: String,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: () => UserEntity,
  })
  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;

  @ApiProperty({
    type: () => CourseEntity,
  })
  @ManyToOne(() => CourseEntity, (course) => course.id)
  course: CourseEntity;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
