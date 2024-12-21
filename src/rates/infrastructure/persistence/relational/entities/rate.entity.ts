import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { CourseEntity } from '../../../../../courses/infrastructure/persistence/relational/entities/course.entity';

@Entity({
  name: 'rate',
})
export class RateEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  star: number;

  @ApiProperty()
  @Column()
  comment: string;

  @ApiProperty()
  @ManyToOne(() => UserEntity, (user) => user.rates)
  user: UserEntity;

  @ApiProperty()
  @ManyToOne(() => CourseEntity, (course) => course.rates)
  course: CourseEntity;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
