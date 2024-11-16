import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { RelationalQuizPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { LessonsModule } from '../lessons/lessons.module';

@Module({
  imports: [RelationalQuizPersistenceModule, LessonsModule],
  controllers: [QuizzesController],
  providers: [QuizzesService],
  exports: [QuizzesService, RelationalQuizPersistenceModule],
})
export class QuizzesModule {}
