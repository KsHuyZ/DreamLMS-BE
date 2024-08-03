import { Module } from '@nestjs/common';

import { EnrollsService } from './enrolls.service';

import { RelationalEnrollPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalEnrollPersistenceModule],
  providers: [EnrollsService],
  exports: [EnrollsService, RelationalEnrollPersistenceModule],
})
export class EnrollsModule {}
