import { Module } from '@nestjs/common';

import { TagsController } from './tag.controller';

import { TagsService } from './tag.service';
import { RelationalTagPersistenceModule } from './persistence/persistence.module';

@Module({
  imports: [RelationalTagPersistenceModule],
  controllers: [TagsController],
  providers: [TagsService],
  exports: [TagsService, RelationalTagPersistenceModule],
})
export class TagsModule {}
