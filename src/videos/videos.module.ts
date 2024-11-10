import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { RelationalVideoPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import ApiVideoClient from '@api.video/nodejs-client';
import { LessonsModule } from '../lessons/lessons.module';

@Module({
  imports: [RelationalVideoPersistenceModule, LessonsModule],
  controllers: [VideosController],
  providers: [
    VideosService,
    {
      provide: ApiVideoClient,
      useFactory: () => {
        return new ApiVideoClient({ apiKey: process.env.UPLOAD_API_KEY });
      },
    },
  ],
  exports: [VideosService, RelationalVideoPersistenceModule],
})
export class VideosModule {}
