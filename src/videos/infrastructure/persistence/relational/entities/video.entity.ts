import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { LessonEntity } from '../../../../../lessons/persistence/entities/lesson.entity';

@Entity({
  name: 'video',
})
export class VideoEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: String })
  title: string;

  @ApiProperty()
  @Column({ type: String })
  description: string;

  @ApiProperty()
  @Column({ type: String })
  videoId: string;

  @ApiProperty()
  @Column({ type: Number })
  order: number;

  @ApiProperty()
  @ManyToOne(() => LessonEntity, (lesson) => lesson.videos)
  lesson: LessonEntity;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deletedAt: Date;
}
