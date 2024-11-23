import { Injectable } from '@nestjs/common';
import { CreateCourseVideoDto } from './dto/create-course-video.dto';
// import { UpdateCourseVideoDto } from './dto/update-course-video.dto';
import { CourseVideoRepository } from './infrastructure/persistence/course-video.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { CourseVideo } from './domain/course-video';
import { VideosService } from '../videos/videos.service';
import { Video } from '../videos/domain/video';

@Injectable()
export class CourseVideosService {
  constructor(
    private readonly courseVideoRepository: CourseVideoRepository,
    private readonly videosService: VideosService,
  ) {}

  async create(createCourseVideoDto: CreateCourseVideoDto) {
    const { createdBy, course } = createCourseVideoDto;
    const videoName = `${Math.random()}-${new Date().toISOString()}`;
    const { video, duration, size } = await this.videosService.uploadVideo({
      title: videoName,
      description: videoName,
      video: createCourseVideoDto.video,
    });
    const { videoId } = video;
    const videoDomain = new Video();
    videoDomain.title = videoName;
    videoDomain.description = videoName;
    videoDomain.duration = Math.round(duration);
    videoDomain.size = size;
    videoDomain.videoId = videoId;
    videoDomain.createdBy = createdBy;
    return this.courseVideoRepository.create({
      ...createCourseVideoDto,
      course,
      video: videoDomain,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.courseVideoRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: CourseVideo['id']) {
    return this.courseVideoRepository.findById(id);
  }

  // async update(
  //   id: CourseVideo['id'],
  //   updateCourseVideoDto: UpdateCourseVideoDto,
  // ) {
  //   const { courseId } = updateCourseVideoDto;
  //   if (!courseId) throw new BadRequestException('Course id not found');
  //   const course = await this.coursesService.findById(courseId);
  //   if (!course) throw new BadRequestException('Course not found');
  //   return this.courseVideoRepository.update(id, { course });
  // }

  remove(id: CourseVideo['id']) {
    return this.courseVideoRepository.remove(id);
  }
}
