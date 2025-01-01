import { Module } from '@nestjs/common';

import { CategoriesController } from './category.controller';

import { CategoriesService } from './category.service';
import { RelationalTagPersistenceModule } from './persistence/persistence.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [RelationalTagPersistenceModule, CloudinaryModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService, RelationalTagPersistenceModule],
})
export class CategoriesModule {}
