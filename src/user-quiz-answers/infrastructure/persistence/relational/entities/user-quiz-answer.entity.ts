import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { QuestionEntity } from '../../../../../questions/infrastructure/persistence/relational/entities/question.entity';
import { AnswerEntity } from '../../../../../answers/infrastructure/persistence/relational/entities/answer.entity';
import { UserQuizEntity } from '../../../../../user-quizzes/infrastructure/persistence/relational/entities/user-quiz.entity';

@Entity({
  name: 'user_quiz_answer',
})
export class UserQuizAnswerEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @ManyToOne(() => UserQuizEntity, (userQuiz) => userQuiz.id)
  userQuiz: UserQuizEntity;

  @ApiProperty()
  @ManyToOne(() => QuestionEntity, (question) => question.id)
  question: QuestionEntity;

  @ApiProperty()
  @ManyToOne(() => AnswerEntity, (answer) => answer.id)
  answer: AnswerEntity;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
