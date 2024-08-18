import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import ApiVideoClient from '@api.video/nodejs-client';
@Module({
  providers: [
    VideosService,
    {
      provide: ApiVideoClient,
      useFactory: () => {
        return new ApiVideoClient({ apiKey: process.env.UPLOAD_API_KEY });
      },
    },
  ],
  exports: [VideosService],
})
export class VideosModule {}
