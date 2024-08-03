import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { RelationalSessionPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalSessionPersistenceModule],
  providers: [SessionService],
  exports: [SessionService, RelationalSessionPersistenceModule],
})
export class SessionModule {}
