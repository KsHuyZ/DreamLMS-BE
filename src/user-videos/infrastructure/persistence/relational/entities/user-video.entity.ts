import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { LessonVideoEntity } from '../../../../../lesson-videos/infrastructure/persistence/relational/entities/lesson-video.entity';

@Entity({
  name: 'user_video',
})
export class UserVideoEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.userVideos)
  user: UserEntity;

  @ManyToOne(() => LessonVideoEntity, (video) => video.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  video: LessonVideoEntity;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
