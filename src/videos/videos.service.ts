import { Injectable } from '@nestjs/common';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VideoRepository } from './infrastructure/persistence/video.repository';
import { Video as VideoDomain } from './domain/video';
import ApiVideoClient from '@api.video/nodejs-client';
import { UploadVideoPayload } from './types/upload-video';
import * as fs from 'fs';
import * as path from 'path';
import getVideoDurationInSeconds from 'get-video-duration';

@Injectable()
export class VideosService {
  constructor(
    private readonly videoRepository: VideoRepository,
    private readonly client: ApiVideoClient,
  ) {}

  async uploadVideo(payload: UploadVideoPayload) {
    const { title, description, video } = payload;
    const filePath = path.resolve('./video-upload', video.filename);
    const size = video.size;
    const videoObj = await this.client.videos.create({ title, description });
    const result = await this.client.videos.upload(videoObj.videoId, filePath);
    const duration = await getVideoDurationInSeconds(filePath);
    fs.unlinkSync(filePath);
    return { video: result, duration, size };
  }

  findOne(id: VideoDomain['id']) {
    return this.videoRepository.findById(id);
  }

  update(id: VideoDomain['id'], updateVideoDto: UpdateVideoDto) {
    return this.videoRepository.update(id, updateVideoDto);
  }

  remove(id: VideoDomain['id']) {
    return this.videoRepository.remove(id);
  }
}
