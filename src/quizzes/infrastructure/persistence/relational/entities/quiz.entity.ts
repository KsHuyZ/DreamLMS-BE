import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { LessonEntity } from '../../../../../lessons/persistence/entities/lesson.entity';
import { QuestionEntity } from '../../../../../questions/infrastructure/persistence/relational/entities/question.entity';

@Entity({
  name: 'quiz',
})
export class QuizEntity extends EntityRelationalHelper {
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
  @Column()
  time: number;

  @ApiProperty()
  @ManyToOne(() => LessonEntity, (lesson) => lesson.quizzes)
  lesson: LessonEntity;

  @ApiProperty()
  @OneToMany(() => QuestionEntity, (question) => question.quiz, {
    cascade: true,
  })
  questions: QuestionEntity[];

  @ApiProperty()
  @Column({ default: false })
  disabled: boolean;

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
