import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { RelationalQuestionPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { AnswersModule } from '../answers/answers.module';
import { UserQuizAnswersModule } from '../user-quiz-answers/user-quiz-answers.module';

@Module({
  imports: [
    RelationalQuestionPersistenceModule,
    AnswersModule,
    UserQuizAnswersModule,
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [QuestionsService, RelationalQuestionPersistenceModule],
})
export class QuestionsModule {}
