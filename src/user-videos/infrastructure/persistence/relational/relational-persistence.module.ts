import { Module } from '@nestjs/common';
import { UserVideoRepository } from '../user-video.repository';
import { UserVideoRelationalRepository } from './repositories/user-video.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserVideoEntity } from './entities/user-video.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserVideoEntity])],
  providers: [
    {
      provide: UserVideoRepository,
      useClass: UserVideoRelationalRepository,
    },
  ],
  exports: [UserVideoRepository],
})
export class RelationalUserVideoPersistenceModule {}
