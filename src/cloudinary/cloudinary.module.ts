import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';
import { RelationalImagePersistenceModule } from './persistence/persistence.module';

@Module({
  providers: [CloudinaryProvider, CloudinaryService],
  imports: [RelationalImagePersistenceModule],
  exports: [CloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule {}
