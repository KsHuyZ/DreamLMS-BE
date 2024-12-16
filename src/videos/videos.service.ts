import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VideoRepository } from './infrastructure/persistence/video.repository';
import { Video as VideoDomain } from './domain/video';
import ApiVideoClient from '@api.video/nodejs-client';
import { UploadVideoPayload } from './types/upload-video';
import * as fs from 'fs';
import * as path from 'path';
import getVideoDurationInSeconds from 'get-video-duration';
import { User } from '../users/domain/user';

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
    const videoObj = await this.client.videos.create({
      title,
      description,
      language: 'en',
      transcript: true,
      _public: false,
    });
    const result = await this.client.videos.upload(videoObj.videoId, filePath);
    const duration = await getVideoDurationInSeconds(filePath);
    fs.unlinkSync(filePath);
    return { video: result, duration, size };
  }

  async findOne(id: VideoDomain['id']) {
    const video = await this.videoRepository.findById(id);
    if (!video) {
      throw new BadRequestException('Video not found');
    }
    const result = await this.client.videos.get(video.videoId);
    return result.assets?.hls;
  }

  update(id: VideoDomain['id'], updateVideoDto: UpdateVideoDto) {
    return this.videoRepository.update(id, updateVideoDto);
  }

  remove(id: VideoDomain['id']) {
    return this.videoRepository.remove(id);
  }
  getTotalSize(userId: User['id']) {
    return this.videoRepository.getTotalSize(userId);
  }
}
