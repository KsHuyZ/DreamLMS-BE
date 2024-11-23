import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { RelationalVideoPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import ApiVideoClient from '@api.video/nodejs-client';

@Module({
  imports: [RelationalVideoPersistenceModule],
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
