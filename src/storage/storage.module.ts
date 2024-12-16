import { Module } from '@nestjs/common';
import { VideosModule } from '../videos/videos.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { StoragesController } from './storage.controller';
import { StoragesService } from './storage.service';
import { UsersModule } from '../users/users.module';
import { PaymentsModule } from '../payments/payments.module';

@Module({
  imports: [VideosModule, CloudinaryModule, UsersModule, PaymentsModule],
  controllers: [StoragesController],
  providers: [StoragesService],
  exports: [StoragesService],
})
export class StoragesModule {}
