import {
  BadRequestException,
  ForbiddenException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { NullableType } from '../utils/types/nullable.type';
import { FilterCourseDto, SortCourseDto } from './dto/query-course.dto';
import { CourseRepository } from './infrastructure/persistence/course.repository';
import { Course } from './domain/course';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { TagsService } from '../tags/tag.service';
import { CategoriesService } from '../categories/category.service';
import { InfinityPaginationResponseDto } from '../utils/dto/infinity-pagination-response.dto';
import { UsersService } from '../users/users.service';
import { RoleEnum } from '../roles/roles.enum';
import { Image } from '../cloudinary/domain/image';
import { Transactional } from 'typeorm-transactional';
import { CourseStatusEnum } from '../statuses/statuses.enum';
import { CourseVideosService } from '../course-videos/course-videos.service';
import { User } from '../users/domain/user';
import { TCourseQuery } from './types/course.enum';
import { CourseGuestDto } from './dto/course-guest.dto';
import { EnrollsService } from '../enrolls/enrolls.service';
import { CourseEnrollDto } from './dto/course-enroll.dto';
import { PaymentsService } from '../payments/payments.service';
import { UserVideosService } from '../user-videos/user-videos.service';
import { CourseLearningDto } from './dto/course-learning.dto';
import { UserQuizzesService } from '../user-quizzes/user-quizzes.service';
import { CartsService } from '../carts/carts.service';

@Injectable()
export class CoursesService {
  constructor(
    private readonly coursesRepository: CourseRepository,
    private readonly cloudinaryService: CloudinaryService,
    private readonly tagsService: TagsService,
    private readonly categoriesService: CategoriesService,
    private readonly userService: UsersService,
    private readonly courseVideoService: CourseVideosService,
    @Inject(forwardRef(() => EnrollsService))
    private readonly enrollsService: EnrollsService,
    private readonly paymentsService: PaymentsService,
    private readonly userVideoService: UserVideosService,
    private readonly userQuizzesService: UserQuizzesService,
    private readonly cartsService: CartsService,
  ) {}

  findCoursePreview(name: string) {
    return this.coursesRepository.findCoursePreview(name);
  }

  @Transactional()
  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const { createdBy } = createCourseDto;

    if (createdBy.role === RoleEnum.STUDENT) {
      throw new ForbiddenException();
    }

    const imagePayload = createCourseDto.image;
    const imageResponse =
      await this.cloudinaryService.uploadImage(imagePayload);
    if (imageResponse.http_code) throw new Error('Something went wrong!');
    const { original_filename, url, public_id, bytes, format } = imageResponse;
    const image = await this.cloudinaryService.createImage({
      name: original_filename,
      url,
      publicId: public_id,
      format,
      size: bytes,
      createdBy,
    });
    //tag,
    const tagIds = JSON.parse(createCourseDto.tags) as string[];
    const tags = await this.tagsService.findManyByIds(tagIds);

    //category
    const categoryIds = JSON.parse(createCourseDto.categories) as string[];

    const categories = await this.categoriesService.findManyByIds(categoryIds);

    const clonedPayload = {
      ...createCourseDto,
      price: Number(createCourseDto.price) || 0,
      createdBy,
      image,
      tags,
      categories,
    };
    const course = await this.coursesRepository.create(clonedPayload);
    return course;
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    userId,
  }: {
    filterOptions?: FilterCourseDto | null;
    sortOptions?: SortCourseDto | null;
    paginationOptions: IPaginationOptions;
    userId?: string;
  }): Promise<InfinityPaginationResponseDto<TCourseQuery>> {
    return this.coursesRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
      userId,
    });
  }

  findManyWithPaginationByAdmin({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterCourseDto | null;
    sortOptions?: SortCourseDto | null;
    paginationOptions: IPaginationOptions;
  }) {
    return this.coursesRepository.findManyWithPaginationByAdmin({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  findManyByTeacherWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    teacherId,
  }: {
    filterOptions?: FilterCourseDto | null;
    sortOptions?: SortCourseDto | null;
    paginationOptions: IPaginationOptions;
    teacherId: string;
  }): Promise<InfinityPaginationResponseDto<Course>> {
    return this.coursesRepository.findManyByTeacherWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
      teacherId,
    });
  }

  findById(id: Course['id']): Promise<NullableType<Course>> {
    return this.coursesRepository.findById(id);
  }

  async findByLearn(
    id: Course['id'],
    userId?: User['id'],
  ): Promise<NullableType<CourseLearningDto>> {
    if (!userId) throw new BadRequestException('Please sign in first');
    const course = await this.coursesRepository.findCourseByGuest(id);
    if (!course) return null;
    const totalVideos =
      course.lessons.reduce((acc, lesson) => acc + lesson.videos.length, 0) ??
      0;
    const totalQuizzes =
      course.lessons.reduce((acc, lesson) => acc + lesson.quizzes.length, 0) ??
      0;
    const completedVideos =
      await this.userVideoService.countByUserIdAndCourseId(userId, id);
    const completedQuizzes =
      await this.userQuizzesService.countByUserIdAndCourseId(userId, id);
    const enroll = await this.enrollsService.findByCourseAndUserId(userId, id);
    const totalTasks = totalVideos + totalQuizzes;
    const completedTasks = completedVideos + completedQuizzes;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    return { ...course, progress, haveCertificate: enroll?.haveCertificate };
  }

  async getCourseProgress(courseId: Course['id'], userId: User['id']) {
    const course = await this.coursesRepository.findCourseByGuest(courseId);
    if (!course) return 0;
    const totalVideos =
      course.lessons.reduce((acc, lesson) => acc + lesson.videos.length, 0) ??
      0;
    const totalQuizzes =
      course.lessons.reduce((acc, lesson) => acc + lesson.quizzes.length, 0) ??
      0;
    const completedVideos =
      await this.userVideoService.countByUserIdAndCourseId(userId, courseId);
    const completedQuizzes =
      await this.userQuizzesService.countByUserIdAndCourseId(userId, courseId);
    const totalTasks = totalVideos + totalQuizzes;
    const completedTasks = completedVideos + completedQuizzes;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    return progress;
  }

  async findCourseByGuest(
    id: Course['id'],
    userId?: User['id'],
  ): Promise<NullableType<CourseGuestDto>> {
    let isEnrolled = false;
    let alreadyCart = false;
    if (userId) {
      const enroll = await this.enrollsService.findByCourseAndUserId(
        userId,
        id,
      );
      const cart = await this.cartsService.findCartItemsByUserIdAndCourseId(
        userId,
        id,
      );
      isEnrolled = !!enroll;
      alreadyCart = !!cart;
    }
    console.log({ isEnrolled, alreadyCart });
    const course = await this.coursesRepository.findCourseByGuest(id);
    return course ? { ...course, isEnrolled, alreadyCart } : null;
  }

  @Transactional()
  async update(
    id: Course['id'],
    payload: UpdateCourseDto & { image: Image | Express.Multer.File },
  ): Promise<Course | null> {
    const courseExist = await this.coursesRepository.findById(id);
    if (!courseExist) throw new BadRequestException('Course not found');
    const { createdBy } = payload;

    if (!createdBy) throw new UnauthorizedException();

    if (createdBy.role === RoleEnum.STUDENT) {
      throw new ForbiddenException();
    }
    const imagePayload = payload.image as Express.Multer.File;
    let image;
    if (imagePayload && imagePayload?.buffer) {
      const imageResponse =
        await this.cloudinaryService.uploadImage(imagePayload);
      if (imageResponse.http_code) throw new Error('Something went wrong!');
      const { original_filename, url, public_id, bytes, format } =
        imageResponse;
      image = await this.cloudinaryService.createImage({
        name: original_filename,
        url,
        publicId: public_id,
        format,
        size: bytes,
        createdBy,
      });
    } else {
      image = courseExist.image;
    }

    //tag
    const tagIds = JSON.parse(payload.tags ?? '[]') as string[];
    const tags = await this.tagsService.findManyByIds(tagIds);
    //category
    const categoryIds = JSON.parse(payload.categories ?? '[]') as string[];
    const categories = await this.categoriesService.findManyByIds(categoryIds);

    const clonedPayload = {
      ...payload,
      image,
      createdBy,
      tags,
      categories,
    };
    return this.coursesRepository.update(id, clonedPayload);
  }
  @Transactional()
  async remove(id: Course['id']): Promise<void> {
    const course = await this.coursesRepository.findById(id);
    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }
    await this.coursesRepository.remove(id);
    await this.cloudinaryService.removeImage(course.image.id);
  }

  changeStatus(id: Course['id'], { status }: { status: CourseStatusEnum }) {
    return this.coursesRepository.update(id, { status });
  }

  findExceptIds(ids: Course['id'][], name: Course['name']) {
    return this.coursesRepository.findExceptIds(ids, name);
  }

  async findCourseRelated(id: Course['id']) {
    return this.coursesRepository.findCourseRelated(id);
  }

  @Transactional()
  async updateAddition(
    id: Course['id'],
    relatedCourse: string,
    createdBy: User,
    video?: Express.Multer.File,
  ) {
    const related = JSON.parse(relatedCourse) as string[];
    console.log({ related });
    const courseRelated = await this.coursesRepository.findByIds(related);
    console.log({ courseRelated });
    const course = await this.coursesRepository.findById(id);
    if (!course) throw new BadRequestException('Course not found');
    if (video) {
      const courseVideo = await this.courseVideoService.create({
        course,
        video,
        createdBy,
      });
      return this.coursesRepository.update(id, {
        related: courseRelated,
        courseVideo,
      });
    }
    return this.coursesRepository.update(id, {
      related: courseRelated,
    });
  }
  async enrollFreeCourse(payload: CourseEnrollDto) {
    const { courseId, userId } = payload;
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new BadRequestException('Please sign in first');
    }
    const course = await this.coursesRepository.findById(courseId);
    if (!course) {
      throw new BadRequestException('Course not found');
    }
    if (course.price > 0) {
      throw new BadRequestException('Please payment first');
    }
    const enroll = await this.enrollsService.findByCourseAndUserId(
      userId,
      courseId,
    );
    if (enroll) {
      throw new BadRequestException('Course already enroll');
    }
    return this.enrollsService.enrollCourse({ user, course });
  }

  async enrollCourse(payload: CourseEnrollDto) {
    const { courseId, userId } = payload;
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new BadRequestException('Please sign in first');
    }
    const course = await this.coursesRepository.findById(courseId);
    if (!course) {
      throw new BadRequestException('Course not found');
    }
    return this.paymentsService.createPaymentIntent(course, userId);
  }

  findManyByIds = (ids: string[]) => {
    return this.coursesRepository.findByIds(ids);
  };

  async getAnalyzingActiveCourse(userId: User['id']) {
    const total = await this.coursesRepository.getActiveCoursesInMonth(userId);
    const percentage =
      await this.coursesRepository.getPercentActiveCourses(userId);
    return {
      total,
      percentage,
    };
  }

  async getAnalyzingTotalCourse(userId: string) {
    const total = await this.coursesRepository.getTotalCourseInMonth(userId);
    const totalLastMonth =
      (await this.coursesRepository.getTotalCourseLastMonth(userId)) || 1;
    return {
      total,
      percentage: (total / totalLastMonth) * 100,
    };
  }

  getTrendingCourse() {
    return this.coursesRepository.getTrendingCourses();
  }
}
