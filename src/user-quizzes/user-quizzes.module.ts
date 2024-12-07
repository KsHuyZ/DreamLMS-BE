import { Module } from '@nestjs/common';
import { UserQuizzesService } from './user-quizzes.service';
import { UserQuizzesController } from './user-quizzes.controller';
import { RelationalUserQuizPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalUserQuizPersistenceModule],
  controllers: [UserQuizzesController],
  providers: [UserQuizzesService],
  exports: [UserQuizzesService, RelationalUserQuizPersistenceModule],
})
export class UserQuizzesModule {}
