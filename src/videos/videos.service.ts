import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VideoRepository } from './infrastructure/persistence/video.repository';
import { Video } from './domain/video';

@Injectable()
export class VideosService {
  constructor(private readonly videoRepository: VideoRepository) {}

  create(createVideoDto: CreateVideoDto) {
    return this.videoRepository.create(createVideoDto);
  }

  findOne(id: Video['id']) {
    return this.videoRepository.findById(id);
  }

  update(id: Video['id'], updateVideoDto: UpdateVideoDto) {
    return this.videoRepository.update(id, updateVideoDto);
  }

  remove(id: Video['id']) {
    return this.videoRepository.remove(id);
  }
}
