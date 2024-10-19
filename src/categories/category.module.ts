import { Module } from '@nestjs/common';

import { CategoriesController } from './category.controller';

import { CategoriesService } from './category.service';
import { RelationalTagPersistenceModule } from './persistence/persistence.module';

@Module({
  imports: [RelationalTagPersistenceModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService, RelationalTagPersistenceModule],
})
export class CategoriesModule {}
