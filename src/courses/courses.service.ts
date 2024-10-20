import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { NullableType } from '../utils/types/nullable.type';
import { FilterCourseDto, SortCourseDto } from './dto/query-course.dto';
import { CourseRepository } from './infrastructure/persistence/course.repository';
import { Course } from './domain/course';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { User } from '../users/domain/user';
import { UpdateCourseDto } from './dto/update-course.dto';
import { VideosService } from '../videos/videos.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { TagsService } from '../tags/tag.service';
import { validate as isValidUUID } from 'uuid';
import { CategoriesService } from '../categories/category.service';
import { InfinityPaginationResponseDto } from '../utils/dto/infinity-pagination-response.dto';
import { UsersService } from '../users/users.service';
import { RoleEnum } from '../roles/roles.enum';
@Injectable()
export class CoursesService {
  constructor(
    private readonly coursesRepository: CourseRepository,
    private readonly videosService: VideosService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly tagsService: TagsService,
    private readonly categoriesService: CategoriesService,
    private readonly userService: UsersService,
  ) {}

  async create(
    createCourseDto: CreateCourseDto & { createdBy: string },
  ): Promise<Course> {
    const createdBy = await this.userService.findById(
      createCourseDto.createdBy,
    );
    if (!createdBy) {
      throw new UnauthorizedException();
    }

    if (createdBy.role === RoleEnum.STUDENT) {
      throw new ForbiddenException();
    }

    const imagePayload = createCourseDto.image;
    const imageResponse =
      await this.cloudinaryService.uploadImage(imagePayload);
    if (imageResponse.http_code) throw new Error('Something went wrong!');

    //tag
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
      image: imageResponse.url,
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
    sortOptions?: SortCourseDto[] | null;
    paginationOptions: IPaginationOptions;
    userId?: string;
  }): Promise<InfinityPaginationResponseDto<Course>> {
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
    sortOptions?: SortCourseDto[] | null;
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

  async update(
    id: Course['id'],
    payload: UpdateCourseDto,
  ): Promise<Course | null> {
    const createdBy = new User();
    let image = payload.image as string;
    if (typeof image !== 'string') {
      const imageResponse = await this.cloudinaryService.uploadImage(image);
      if (imageResponse.http_code) throw new Error('Something went wrong!');
      image = imageResponse.url as string;
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

  async remove(id: Course['id']): Promise<void> {
    await this.coursesRepository.remove(id);
  }
}
