import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVideoDto, EBoolean } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VideoRepository } from './infrastructure/persistence/video.repository';
import { Video as VideoDomain } from './domain/video';
import ApiVideoClient from '@api.video/nodejs-client';
import { UploadVideoPayload } from './types/upload-video';
import { LessonRepository } from '../lessons/persistence/lesson.repository';
import * as fs from 'fs';
import * as path from 'path';
import getVideoDurationInSeconds from 'get-video-duration';

@Injectable()
export class VideosService {
  constructor(
    private readonly videoRepository: VideoRepository,
    private readonly client: ApiVideoClient,
    private readonly lessonRepository: LessonRepository,
  ) {}

  async uploadVideo(payload: UploadVideoPayload) {
    const { title, description, video } = payload;
    const filePath = path.resolve('./temp', video.filename);
    const videoObj = await this.client.videos.create({ title, description });
    const result = await this.client.videos.upload(videoObj.videoId, filePath);
    const duration = await getVideoDurationInSeconds(filePath);
    fs.unlinkSync(filePath);
    return { video: result, duration };
  }
  async create(
    createVideoDto: CreateVideoDto & { video: Express.Multer.File },
  ) {
    const { video, duration } = await this.uploadVideo(createVideoDto);
    const videoId = video.videoId;
    const { lessonId } = createVideoDto;
    const lesson = await this.lessonRepository.findById(lessonId);
    if (!lesson) {
      throw new BadRequestException('Lesson not found');
    }
    const lastVideoOrder = lesson.videos.length
      ? lesson.videos[lesson.videos.length].order
      : 0;
    const lastQuizOrder = lesson.quizzes.length
      ? lesson.quizzes[lesson.quizzes.length].order
      : 0;
    const newOrder =
      lastVideoOrder > lastQuizOrder ? lastVideoOrder : lastQuizOrder;
    return this.videoRepository.create({
      ...createVideoDto,
      videoId,
      order: newOrder + 1,
      duration: duration ? Math.round(duration) : 0,
      isFree: createVideoDto.isFree === EBoolean.TRUE ? true : false,
      lesson,
    });
  }

  findOne(id: VideoDomain['id']) {
    return this.videoRepository.findById(id);
  }

  update(id: VideoDomain['id'], updateVideoDto: UpdateVideoDto) {
    return this.videoRepository.update(id, {
      ...updateVideoDto,
      isFree: updateVideoDto.isFree === EBoolean.TRUE ? true : false,
    });
  }

  remove(id: VideoDomain['id']) {
    return this.videoRepository.remove(id);
  }
}
