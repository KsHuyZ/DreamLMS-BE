import { Injectable } from '@nestjs/common';
import { NullableType } from '../utils/types/nullable.type';
import { UploadVideoPayload } from './types/upload-video';
import Video from '@api.video/nodejs-client/lib/model/Video';
import ApiVideoClient from '@api.video/nodejs-client';
import VideoUpdatePayload from '@api.video/nodejs-client/lib/model/VideoUpdatePayload';

@Injectable()
export class VideosService {
  constructor(private client: ApiVideoClient) {}
  async uploadVideo(payload: UploadVideoPayload): Promise<string> {
    const { title, description, file } = payload;
    const videoObj = await this.client.videos.create({ title, description });
    const video = await this.client.videos.upload(videoObj.videoId, file.path);
    return video.videoId;
  }

  getVideoById(id: Video['videoId']): Promise<NullableType<Video>> {
    return this.client.videos.get(id);
  }

  async update(
    id: Video['videoId'],
    payload: VideoUpdatePayload,
  ): Promise<Video | null> {
    return this.client.videos.update(id, payload);
  }

  async remove(id: Video['videoId']): Promise<void> {
    await this.client.videos.delete(id);
  }
}
