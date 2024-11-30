import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
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
import { validate as isValidUUID } from 'uuid';
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

@Injectable()
export class CoursesService {
  constructor(
    private readonly coursesRepository: CourseRepository,
    private readonly cloudinaryService: CloudinaryService,
    private readonly tagsService: TagsService,
    private readonly categoriesService: CategoriesService,
    private readonly userService: UsersService,
    private readonly courseVideoService: CourseVideosService,
    private readonly enrollsService: EnrollsService,
    private readonly paymentsService: PaymentsService,
  ) {}

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
    const parseTags = JSON.parse(createCourseDto.tags) as string[];
    const existTagIds = parseTags.filter((tag) => isValidUUID(tag));
    const newTags = parseTags.filter((tag) => !isValidUUID(tag));
    const newTagsMapper = newTags.map((tag) => ({ name: tag }));
    const newTagsDto = await this.tagsService.createMany(newTagsMapper);
    const newTagIds = newTagsDto.map((tag) => tag.id);
    const tags = await this.tagsService.findManyByIds([
      ...existTagIds,
      ...newTagIds,
    ]);

    //category
    const parseCategories = JSON.parse(createCourseDto.categories) as string[];
    const existCategoryIds = parseCategories.filter((category) =>
      isValidUUID(category),
    );
    const newCategories = parseCategories.filter(
      (category) => !isValidUUID(category),
    );
    const newCategoryMapper = newCategories.map((category) => ({
      name: category,
    }));
    const newCategoriesDto =
      await this.categoriesService.createMany(newCategoryMapper);
    const newCategoryIds = newCategoriesDto.map((category) => category.id);
    const categories = await this.categoriesService.findManyByIds([
      ...existCategoryIds,
      ...newCategoryIds,
    ]);

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

  async findCourseByGuest(
    id: Course['id'],
    userId?: User['id'],
  ): Promise<NullableType<CourseGuestDto>> {
    let isEnrolled = false;
    if (userId) {
      const enroll = await this.enrollsService.findByCourseAndUserId(
        userId,
        id,
      );
      isEnrolled = !!enroll;
    }
    const course = await this.coursesRepository.findCourseByGuest(id);
    return course ? { ...course, isEnrolled } : null;
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
    const parseTags = JSON.parse(payload.tags ?? '[]') as string[];
    const existTagIds = parseTags.filter((tag) => isValidUUID(tag));
    const newTags = parseTags.filter((tag) => !isValidUUID(tag));
    const newTagsMapper = newTags.map((tag) => ({ name: tag }));
    const newTagsDto = await this.tagsService.createMany(newTagsMapper);
    const newTagIds = newTagsDto.map((tag) => tag.id);
    const tags = await this.tagsService.findManyByIds([
      ...existTagIds,
      ...newTagIds,
    ]);
    console.log({ payload: payload.categories });
    //category
    const parseCategories = JSON.parse(payload.categories ?? '[]') as string[];
    const existCategoryIds = parseCategories.filter((category) =>
      isValidUUID(category),
    );
    const newCategories = parseCategories.filter(
      (category) => !isValidUUID(category),
    );
    const newCategoryMapper = newCategories.map((category) => ({
      name: category,
    }));
    const newCategoriesDto =
      await this.categoriesService.createMany(newCategoryMapper);
    const newCategoryIds = newCategoriesDto.map((category) => category.id);
    const categories = await this.categoriesService.findManyByIds([
      ...existCategoryIds,
      ...newCategoryIds,
    ]);

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

  @Transactional()
  async updateAddition(
    id: Course['id'],
    video: Express.Multer.File,
    relatedCourse: string,
    createdBy: User,
  ) {
    const related = JSON.parse(relatedCourse) as string[];
    const courseRelated = await this.coursesRepository.findByIds(related);
    const course = await this.coursesRepository.findById(id);
    if (!course) throw new BadRequestException('Course not found');
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
}
