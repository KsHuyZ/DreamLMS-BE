import { Module } from '@nestjs/common';
import { UserQuizAnswersService } from './user-quiz-answers.service';
import { UserQuizAnswersController } from './user-quiz-answers.controller';
import { RelationalUserQuizAnswerPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalUserQuizAnswerPersistenceModule],
  controllers: [UserQuizAnswersController],
  providers: [UserQuizAnswersService],
  exports: [UserQuizAnswersService, RelationalUserQuizAnswerPersistenceModule],
})
export class UserQuizAnswersModule {}
