import { Module } from '@nestjs/common';

import { EnrollsService } from './enrolls.service';

import { RelationalEnrollPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { UsersModule } from '../users/users.module';
import { EnrollsController } from './enrolls.controller';

@Module({
  imports: [RelationalEnrollPersistenceModule, UsersModule],
  providers: [EnrollsService],
  controllers: [EnrollsController],
  exports: [EnrollsService, RelationalEnrollPersistenceModule],
})
export class EnrollsModule {}
