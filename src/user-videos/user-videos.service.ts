import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserVideoDto } from './dto/create-user-video.dto';
import { UserVideoRepository } from './infrastructure/persistence/user-video.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { UserVideo } from './domain/user-video';
import { UsersService } from '../users/users.service';
import { LessonVideosService } from '../lesson-videos/lesson-videos.service';
import { User } from '../users/domain/user';
import { Course } from '../courses/domain/course';

@Injectable()
export class UserVideosService {
  constructor(
    private readonly userVideoRepository: UserVideoRepository,
    private readonly usersService: UsersService,
    private readonly lessonVideoService: LessonVideosService,
  ) {}

  async create(createUserVideoDto: CreateUserVideoDto) {
    const { userId, videoId } = createUserVideoDto;
    const user = await this.usersService.findById(userId);
    if (!user) throw new BadRequestException('User not found');
    const video = await this.lessonVideoService.findByVideoId(videoId);
    if (!video) throw new BadRequestException('Video not found');
    const userVideo = await this.userVideoRepository.findByUserIdAndVideoId(
      userId,
      videoId,
    );
    if (userVideo) return userVideo;
    return this.userVideoRepository.create({ video, user });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.userVideoRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: UserVideo['id']) {
    return this.userVideoRepository.findById(id);
  }

  remove(id: UserVideo['id']) {
    return this.userVideoRepository.remove(id);
  }

  countByUserIdAndCourseId(
    userId: User['id'],
    courseId: Course['id'],
  ): Promise<number> {
    return this.userVideoRepository.countByUserIdAndCourseId(userId, courseId);
  }

  findByUserIdAndCourseId(
    userId: User['id'],
    courseId: Course['id'],
  ): Promise<UserVideo[]> {
    return this.userVideoRepository.findByUserIdAndCourseId(userId, courseId);
  }
}
