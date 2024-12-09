import { forwardRef, Module } from '@nestjs/common';
import { UserQuizzesService } from './user-quizzes.service';
import { UserQuizzesController } from './user-quizzes.controller';
import { RelationalUserQuizPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { UsersModule } from '../users/users.module';
import { QuizzesModule } from '../quizzes/quizzes.module';

@Module({
  imports: [
    RelationalUserQuizPersistenceModule,
    UsersModule,
    forwardRef(() => QuizzesModule),
  ],
  controllers: [UserQuizzesController],
  providers: [UserQuizzesService],
  exports: [UserQuizzesService, RelationalUserQuizPersistenceModule],
})
export class UserQuizzesModule {}
