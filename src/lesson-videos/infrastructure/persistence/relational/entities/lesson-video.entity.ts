import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { VideoEntity } from '../../../../../videos/infrastructure/persistence/relational/entities/video.entity';
import { LessonEntity } from '../../../../../lessons/persistence/entities/lesson.entity';

@Entity({
  name: 'lesson_video',
})
export class LessonVideoEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  order: number;

  @ApiProperty()
  @JoinColumn()
  @OneToOne(() => VideoEntity, { cascade: true, eager: true })
  video: VideoEntity;

  @ApiProperty()
  @Column()
  isFree: boolean;

  @ApiProperty()
  @ManyToOne(() => LessonEntity, (lesson) => lesson.videos)
  lesson: LessonEntity;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
