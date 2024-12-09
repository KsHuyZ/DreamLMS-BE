import { forwardRef, Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { RelationalQuizPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { LessonsModule } from '../lessons/lessons.module';
import { UserQuizzesModule } from '../user-quizzes/user-quizzes.module';
import { UserQuizAnswersModule } from '../user-quiz-answers/user-quiz-answers.module';

@Module({
  imports: [
    RelationalQuizPersistenceModule,
    forwardRef(() => LessonsModule),
    forwardRef(() => UserQuizzesModule),
    UserQuizAnswersModule,
  ],
  controllers: [QuizzesController],
  providers: [QuizzesService],
  exports: [QuizzesService, RelationalQuizPersistenceModule],
})
export class QuizzesModule {}
