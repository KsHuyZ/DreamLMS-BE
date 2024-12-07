import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { NullableType } from '../utils/types/nullable.type';
import { DeepPartial } from '../utils/types/deep-partial.type';
import { Lesson } from './domain/lesson';
import { LessonRepository } from './persistence/lesson.repository';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UserVideosService } from '../user-videos/user-videos.service';
import { CoursesService } from '../courses/courses.service';

@Injectable()
export class LessonsService {
  constructor(
    private readonly lessonRepository: LessonRepository,
    @Inject(forwardRef(() => CoursesService))
    private readonly coursesService: CoursesService,
    @Inject(forwardRef(() => UserVideosService))
    private readonly userVideosService: UserVideosService,
  ) {}

  async create(createLessonDto: CreateLessonDto): Promise<Lesson> {
    const course = await this.coursesService.findById(createLessonDto.courseId);
    if (!course) {
      throw new NotFoundException();
    }
    const lessons = await this.findByCourseId(createLessonDto.courseId);
    return this.lessonRepository.create({
      ...createLessonDto,
      course,
      order: lessons.length + 1,
    });
  }

  findByCourseId(id: string): Promise<Lesson[]> {
    return this.lessonRepository.findByCourseId(id);
  }

  async findByCourseLearn(id: string, userId: string) {
    const lessons = await this.lessonRepository.findByCourseId(id);

    const completedVideos =
      await this.userVideosService.findByUserIdAndCourseId(userId, id);
    return lessons.map((lesson) => {
      const videos = lesson.videos.map((video) => ({
        ...video,
        isCompleted: completedVideos.some(
          (completeVideo) => completeVideo.video.id === video.id,
        ),
      }));
      return { ...lesson, videos };
    });
  }

  async findById(id: Lesson['id']): Promise<NullableType<Lesson>> {
    return this.lessonRepository.findById(id);
  }

  async update(
    id: Lesson['id'],
    payload: DeepPartial<Lesson>,
  ): Promise<Lesson | null> {
    return this.lessonRepository.update(id, payload);
  }

  async remove(id: Lesson['id']): Promise<void> {
    await this.lessonRepository.remove(id);
  }
}
