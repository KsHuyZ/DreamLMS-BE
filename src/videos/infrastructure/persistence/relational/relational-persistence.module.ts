import { Module } from '@nestjs/common';
import { VideoRepository } from '../video.repository';
import { VideoRelationalRepository } from './repositories/video.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoEntity } from './entities/video.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VideoEntity])],
  providers: [
    {
      provide: VideoRepository,
      useClass: VideoRelationalRepository,
    },
  ],
  exports: [VideoRepository],
})
export class RelationalVideoPersistenceModule {}
