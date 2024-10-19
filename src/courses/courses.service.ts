import { Injectable } from '@nestjs/common';
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
import { CoursesTagService } from '../course-tag/course-tag.service';
import { CategoriesService } from '../categories/category.service';
import { CoursesCategoryService } from '../course-category/course-category.service';
@Injectable()
export class CoursesService {
  constructor(
    private readonly coursesRepository: CourseRepository,
    private readonly videosService: VideosService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly tagsService: TagsService,
    private readonly categoriesService: CategoriesService,
    private readonly courseTagService: CoursesTagService,
    private readonly courseCategoryService: CoursesCategoryService,
  ) {}

  async create(
    createCourseDto: CreateCourseDto & { createdBy: string },
  ): Promise<Course> {
    const createdBy = new User();
    createdBy.id = createCourseDto.createdBy;
    const imagePayload = createCourseDto.image;
    const imageResponse =
      await this.cloudinaryService.uploadImage(imagePayload);
    if (imageResponse.http_code) throw new Error('Something went wrong!');

    const clonedPayload = {
      ...createCourseDto,
      price: Number(createCourseDto.price) || 0,
      createdBy,
      image: imageResponse.url,
    };
    const course = await this.coursesRepository.create(clonedPayload);
    //tag
    const parseTags = JSON.parse(clonedPayload.tags) as string[];
    const existTagIds = parseTags.filter((tag) => isValidUUID(tag));
    const newTags = parseTags.filter((tag) => !isValidUUID(tag));
    const newTagsMapper = newTags.map((tag) => ({ name: tag }));
    const newTagsDto = await this.tagsService.createMany(newTagsMapper);
    const newTagIds = newTagsDto.map((tag) => tag.id);
    const tags = await this.tagsService.findManyByIds([
      ...existTagIds,
      ...newTagIds,
    ]);
    const courseTagDto = tags.map((tag) => ({ tag, course }));
    await this.courseTagService.createMany(courseTagDto);

    //category
    const parseCategories = JSON.parse(clonedPayload.categories) as string[];
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
    const courseCategoryDto = categories.map((category) => ({
      category,
      course,
    }));
    await this.courseCategoryService.createMany(courseCategoryDto);
    return course;
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
