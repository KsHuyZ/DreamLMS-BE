import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLessonVideoDto } from './dto/create-lesson-video.dto';
import { UpdateLessonVideoDto } from './dto/update-lesson-video.dto';
import { LessonVideoRepository } from './infrastructure/persistence/lesson-video.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { LessonVideo } from './domain/lesson-video';
import { VideosService } from '../videos/videos.service';
import { LessonsService } from '../lessons/lessons.service';
import { Video } from '../videos/domain/video';
import { User } from '../users/domain/user';
import { EBoolean } from '../videos/dto/create-video.dto';

@Injectable()
export class LessonVideosService {
  constructor(
    private readonly lessonVideoRepository: LessonVideoRepository,
    private readonly videoService: VideosService,
    private readonly lessonService: LessonsService,
  ) {}

  async create(
    payload: CreateLessonVideoDto & {
      video: Express.Multer.File;
      createdBy: User;
    },
  ) {
    const { duration, video } = await this.videoService.uploadVideo(payload);
    const { videoId } = video;
    const { lessonId, title, description, createdBy } = payload;
    const lesson = await this.lessonService.findById(lessonId);
    if (!lesson) {
      throw new BadRequestException('Lesson not found');
    }
    const lastVideoOrder =
      lesson.videos.length > 0
        ? lesson.videos[lesson.videos.length - 1].order
        : 0;
    const lastQuizOrder =
      lesson.quizzes.length > 0
        ? lesson.quizzes[lesson.quizzes.length - 1].order
        : 0;
    const videoDomain = new Video();
    videoDomain.title = title;
    videoDomain.description = description;
    videoDomain.duration = Math.round(duration);
    videoDomain.videoId = videoId;
    videoDomain.createdBy = createdBy;
    videoDomain.size = payload.video.size;
    const newOrder =
      lastVideoOrder > lastQuizOrder ? lastVideoOrder : lastQuizOrder;
    return this.lessonVideoRepository.create({
      ...payload,
      order: newOrder,
      video: videoDomain,
      lesson,
      isFree: payload.isFree === EBoolean.TRUE ? true : false,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.lessonVideoRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: LessonVideo['id']) {
    return this.lessonVideoRepository.findById(id);
  }

  async update(
    id: LessonVideo['id'],
    payload: UpdateLessonVideoDto & {
      video: Express.Multer.File;
      createdBy: User;
    },
  ) {
    const videoPayload = payload.video as Video;
    let duration: number | undefined;
    let videoId: string | undefined;
    if (videoPayload.id) {
      videoId = videoPayload.videoId;
    } else {
      const videoPayload = payload.video as Express.Multer.File;
      const videoResponse = await this.videoService.uploadVideo({
        title: payload.title ?? '',
        description: payload.description ?? '',
        video: videoPayload,
      });

      duration = videoResponse.duration;
      videoId = videoResponse.video.videoId;
    }

    const { lessonId, title, description, createdBy } = payload;
    if (!lessonId) {
      throw new BadRequestException('Lesson Id not found');
    }
    const lesson = await this.lessonService.findById(lessonId);
    if (!lesson) {
      throw new BadRequestException('Lesson not found');
    }
    const lastVideoOrder = lesson.videos.length
      ? lesson.videos[lesson.videos.length].order
      : 0;
    const lastQuizOrder = lesson.quizzes.length
      ? lesson.quizzes[lesson.quizzes.length].order
      : 0;
    const videoDomain = {
      title,
      description,
      duration,
      videoId,
      createdBy,
    };
    const newOrder =
      lastVideoOrder > lastQuizOrder ? lastVideoOrder : lastQuizOrder;
    return this.lessonVideoRepository.update(id, {
      ...payload,
      order: newOrder,
      video: videoDomain,
      isFree: payload.isFree === EBoolean.TRUE ? true : false,
    });
  }

  remove(id: LessonVideo['id']) {
    return this.lessonVideoRepository.remove(id);
  }
}
