import { Module } from '@nestjs/common';
import { QuizRepository } from '../quiz.repository';
import { quizRelationalRepository } from './repositories/quiz.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizEntity } from './entities/quiz.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuizEntity])],
  providers: [
    {
      provide: QuizRepository,
      useClass: quizRelationalRepository,
    },
  ],
  exports: [QuizRepository],
})
export class RelationalQuizPersistenceModule {}
