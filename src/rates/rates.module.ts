import { Module } from '@nestjs/common';
import { RatesService } from './rates.service';
import { RatesController } from './rates.controller';
import { RelationalRatePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { UsersModule } from '../users/users.module';
import { CoursesModule } from '../courses/courses.module';

@Module({
  imports: [RelationalRatePersistenceModule, UsersModule, CoursesModule],
  controllers: [RatesController],
  providers: [RatesService],
  exports: [RatesService, RelationalRatePersistenceModule],
})
export class RatesModule {}
