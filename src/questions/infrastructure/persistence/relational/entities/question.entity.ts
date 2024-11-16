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
import { QuizEntity } from '../../../../../quizzes/infrastructure/persistence/relational/entities/quiz.entity';
import { AnswerEntity } from '../../../../../answers/infrastructure/persistence/relational/entities/answer.entity';
import { QuizType } from '../../../../../quizzes/types/quiz.enum';

@Entity({
  name: 'question',
})
export class QuestionEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @ManyToOne(() => QuizEntity, (quiz) => quiz.questions)
  quiz: QuizEntity;

  @ApiProperty()
  @Column({ enum: QuizType })
  type: QuizType;

  @ApiProperty()
  @OneToMany(() => AnswerEntity, (answer) => answer.question, { cascade: true })
  answers: AnswerEntity[];

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
