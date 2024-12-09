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
import { QuizEntity } from '../../../../../quizzes/infrastructure/persistence/relational/entities/quiz.entity';

@Entity({
  name: 'user_quiz',
})
export class UserQuizEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @ManyToOne(() => UserEntity, (user) => user.userVideos)
  user: UserEntity;

  @ApiProperty()
  @ManyToOne(() => QuizEntity, (quiz) => quiz.id)
  quiz: QuizEntity;

  @ApiProperty()
  @Column('decimal', { precision: 5, scale: 2 })
  score: number;

  @ApiProperty()
  @Column({ default: false })
  isCompleted: boolean;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
