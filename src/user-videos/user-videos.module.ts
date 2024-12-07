import { Module } from '@nestjs/common';
import { UserVideosService } from './user-videos.service';
import { UserVideosController } from './user-videos.controller';
import { RelationalUserVideoPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { UsersModule } from '../users/users.module';
import { LessonVideosModule } from '../lesson-videos/lesson-videos.module';

@Module({
  imports: [
    RelationalUserVideoPersistenceModule,
    UsersModule,
    LessonVideosModule,
  ],
  controllers: [UserVideosController],
  providers: [UserVideosService],
  exports: [UserVideosService, RelationalUserVideoPersistenceModule],
})
export class UserVideosModule {}
