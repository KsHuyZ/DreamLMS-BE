import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { RelationalQuizPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalQuizPersistenceModule],
  controllers: [QuizzesController],
  providers: [QuizzesService],
  exports: [QuizzesService, RelationalQuizPersistenceModule],
})
export class QuizzesModule {}
