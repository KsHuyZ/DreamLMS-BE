import { Module } from '@nestjs/common';
import { UserQuizAnswerRepository } from '../user-quiz-answer.repository';
import { UserQuizAnswerRelationalRepository } from './repositories/user-quiz-answer.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserQuizAnswerEntity } from './entities/user-quiz-answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserQuizAnswerEntity])],
  providers: [
    {
      provide: UserQuizAnswerRepository,
      useClass: UserQuizAnswerRelationalRepository,
    },
  ],
  exports: [UserQuizAnswerRepository],
})
export class RelationalUserQuizAnswerPersistenceModule {}
