import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from './entities/image.entity';
import { ImageRepository } from './image.repository';
import { ImageRelationalRepository } from './repositories/image.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ImageEntity])],
  providers: [
    {
      provide: ImageRepository,
      useClass: ImageRelationalRepository,
    },
  ],
  exports: [ImageRepository],
})
export class RelationalImagePersistenceModule {}
