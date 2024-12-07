import { Module } from '@nestjs/common';
import { UserQuizRepository } from '../user-quiz.repository';
import { UserQuizRelationalRepository } from './repositories/user-quiz.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserQuizEntity } from './entities/user-quiz.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserQuizEntity])],
  providers: [
    {
      provide: UserQuizRepository,
      useClass: UserQuizRelationalRepository,
    },
  ],
  exports: [UserQuizRepository],
})
export class RelationalUserQuizPersistenceModule {}
