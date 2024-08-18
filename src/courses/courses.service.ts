import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { NullableType } from '../utils/types/nullable.type';
import { FilterCourseDto, SortCourseDto } from './dto/query-course.dto';
import { CourseRepository } from './infrastructure/persistence/course.repository';
import { Course } from './domain/course';
import { StatusEnum } from '../statuses/statuses.enum';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { User } from '../users/domain/user';
import { UpdateCourseDto } from './dto/update-course.dto';
import { VideosService } from '../videos/videos.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class CoursesService {
  constructor(
    private readonly coursesRepository: CourseRepository,
    private readonly videosService: VideosService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const relatedCourses = createCourseDto.related.map((relatedCourse) => {
      const course = new Course();
      course.id = relatedCourse.id;
      return course;
    });

    const createdBy = new User();
    createdBy.id = createCourseDto.createdBy;
    const imagePayload = createCourseDto.image;

    const imageResponse =
      await this.cloudinaryService.uploadImage(imagePayload);
    if (imageResponse.http_code) throw new Error('Something went wrong!');

    const videoPreview = await this.videosService.uploadVideo({
      title: createCourseDto.name,
      description: createCourseDto.description,
      file: createCourseDto.videoPreview,
    });

    const clonedPayload = {
      ...createCourseDto,
      related: relatedCourses,
      createdBy,
      image: imageResponse.url,
      videoPreview,
    };
    if (clonedPayload.status) {
      const statusObject = Object.values(StatusEnum)
        .map(String)
        .includes(String(clonedPayload.status));
      if (!statusObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            status: 'statusNotExists',
          },
        });
      }
    }

    return this.coursesRepository.create(clonedPayload);
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    userId,
  }: {
    filterOptions?: FilterCourseDto | null;
    sortOptions?: SortCourseDto[] | null;
    paginationOptions: IPaginationOptions;
    userId?: string;
  }): Promise<Course[]> {
    return this.coursesRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
      userId,
    });
  }

  findById(id: Course['id']): Promise<NullableType<Course>> {
    return this.coursesRepository.findById(id);
  }

  async update(
    id: Course['id'],
    payload: UpdateCourseDto,
  ): Promise<Course | null> {
    const createdBy = new User();
    if (payload.createdBy) {
      createdBy.id = payload.createdBy;
    }
    let image = payload.image as string;
    if (typeof image !== 'string') {
      const imageResponse = await this.cloudinaryService.uploadImage(image);
      if (imageResponse.http_code) throw new Error('Something went wrong!');
      image = imageResponse.url as string;
    }
    let videoPreview = payload.videoPreview as string;
    if (typeof videoPreview !== 'string') {
      const videoResponse = await this.videosService.uploadVideo({
        title: payload.name!,
        description: payload.description!,
        file: videoPreview,
      });
      videoPreview = videoResponse;
    }
    const clonedPayload = {
      ...payload,
      videoPreview,
      image,
      createdBy,
    };
    return this.coursesRepository.update(id, clonedPayload);
  }

  async remove(id: Course['id']): Promise<void> {
    await this.coursesRepository.remove(id);
  }
}
