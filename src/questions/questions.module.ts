import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { RelationalQuestionPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { AnswersModule } from '../answers/answers.module';

@Module({
  imports: [RelationalQuestionPersistenceModule, AnswersModule],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [QuestionsService, RelationalQuestionPersistenceModule],
})
export class QuestionsModule {}
