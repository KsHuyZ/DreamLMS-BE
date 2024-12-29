import { Injectable } from '@nestjs/common';

import { NullableType } from '../../../../../utils/types/nullable.type';
import {
  FilterCourseDto,
  SortCourseDto,
} from '../../../../dto/query-course.dto';
import { Course } from '../../../../domain/course';
import { CourseRepository } from '../../course.repository';
import { CourseEntity } from '../entities/course.entity';
import { CourseMapper } from '../mappers/course.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, ILike, In, Not, Repository } from 'typeorm';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { infinityPagination } from '../../../../../utils/infinity-pagination';
import { InfinityPaginationResponseDto } from '../../../../../utils/dto/infinity-pagination-response.dto';
import { CourseStatusEnum } from '../../../../../statuses/statuses.enum';
import { priceCondition } from '../../../../../utils/course/course-price-mapper';
import { mapCourseSort } from '../../../../../utils/course/course-sort-mapper';
import { levelCourseMapper } from '../../../../../utils/course/course-level-mapper';
import { TCourseQuery } from '../../../../types/course.enum';
import { CourseGuestDto } from '../../../../dto/course-guest.dto';
import { User } from '../../../../../users/domain/user';
import { endOfMonth, startOfMonth, subMonths } from 'date-fns';
import { mapDuration } from '../../../../utils';

@Injectable()
export class CoursesRelationalRepository implements CourseRepository {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly coursesRepository: Repository<CourseEntity>,
  ) {}

  async create(data: Course): Promise<Course> {
    const persistenceModel = CourseMapper.toPersistence(data);
    const createdCourse = await this.coursesRepository.save(
      this.coursesRepository.create(persistenceModel),
    );
    const newEntity = await createdCourse.save();
    return CourseMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
    sortOptions,
    paginationOptions,
    // userId,
    filterOptions,
  }: {
    filterOptions: FilterCourseDto | null;
    sortOptions?: SortCourseDto | null;
    paginationOptions: IPaginationOptions;
    userId?: string;
  }): Promise<InfinityPaginationResponseDto<TCourseQuery>> {
    const where: FindOptionsWhere<CourseEntity> = {
      name: ILike(`%${filterOptions?.name}%`),
      ...priceCondition(filterOptions?.payType),
      ...levelCourseMapper(filterOptions?.level),
    };

    const orderByConditions: Record<
      string,
      { column: string; order: 'ASC' | 'DESC' }
    > = {
      createdAt: { column: 'course.createdAt', order: 'DESC' },
      avgStar: { column: 'avgStar', order: 'DESC' },
      totalReviewed: { column: 'totalReviewed', order: 'DESC' },
    };

    const sortOption = sortOptions?.sortBy || 'createdAt'; // sortParam là tham số đầu vào (ví dụ từ query string hoặc body request)
    const orderByCondition =
      orderByConditions[sortOption] || orderByConditions['createdAt'];

    const durations = filterOptions?.duration || [];

    let durationConditions = '';
    let durationParams = {};

    if (durations.length > 0) {
      durationConditions = durations
        .map((duration, index) => {
          const [, max] = mapDuration(duration);
          if (max) {
            return `(SUM(video.duration) BETWEEN :minDuration${index} AND :maxDuration${index})`;
          }
          return `(SUM(video.duration) >= :minDuration${index})`;
        })
        .join(' OR ');
      durationParams = durations.reduce((params, duration, index) => {
        const [min, max] = mapDuration(duration);
        params[`minDuration${index}`] = min;
        params[`maxDuration${index}`] = max;
        return params;
      }, {});
    }
    const havingConditions: string[] = [];
    if (durationConditions) {
      havingConditions.push(`(${durationConditions})`);
    }
    const query = this.coursesRepository.createQueryBuilder('course');
    if (filterOptions?.rate) {
      query.having('AVG(rate.star) >= :minRating', {
        minRating: filterOptions.rate,
      });
    }
    if (durationConditions && filterOptions?.rate) {
      query.andHaving(durationConditions, durationParams);
    } else if (!filterOptions?.rate) {
      query.having(durationConditions, durationParams);
    }

    const [coursesEntity, total] = await query
      .leftJoinAndSelect('course.image', 'image')
      .leftJoinAndSelect('course.lessons', 'lessons')
      .leftJoinAndSelect('lessons.videos', 'videos')
      .leftJoinAndSelect('videos.video', 'video')
      .leftJoinAndSelect('lessons.quizzes', 'quizzes')
      .leftJoinAndSelect('course.tags', 'tags')
      .leftJoinAndSelect('course.categories', 'categories')
      .leftJoinAndSelect('course.rates', 'rates')
      .leftJoinAndSelect('course.related', 'related')
      .leftJoinAndSelect('course.createdBy', 'createdBy')
      .leftJoin('course.rates', 'rate')
      .select([
        'course',
        'image',
        'lessons',
        'videos',
        'video',
        'quizzes',
        'tags',
        'categories',
        'rates',
        'related',
        'createdBy',
        'AVG(rate.star) as avgStar',
      ])
      .addSelect('AVG(rate.star)', 'avgStar')
      .addSelect('COUNT(rate.id)', 'totalReviewed')
      .where(where)
      .groupBy(
        'course.id, image.id, lessons.id, tags.id, categories.id, rates.id, related.id, createdBy.id, videos.id, quizzes.id, video.id',
      )
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .take(paginationOptions.limit)
      .orderBy(orderByCondition.column, orderByCondition.order)
      .getManyAndCount();

    const data = coursesEntity.map((course) => ({
      ...CourseMapper.toDomain(course),
      lessons: course.lessons.length,
      duration: course.lessons.reduce((total, lesson) => {
        return (
          total +
          lesson.videos.reduce((totalVideo, video) => {
            return totalVideo + video.video.duration;
          }, 0)
        );
      }, 0),
      star:
        course.rates.length > 0
          ? course.rates.reduce((total, rate) => total + rate.star, 0) /
            course.rates.length
          : 0,
    }));

    return infinityPagination(data, {
      ...paginationOptions,
      total,
    });
  }

  async findCourseRelated(id: Course['id']): Promise<TCourseQuery[]> {
    const query = this.coursesRepository.createQueryBuilder('course');
    const where = {
      id,
    };
    const courseEntities = await query
      .leftJoinAndSelect('course.related', 'related')
      .leftJoinAndSelect('related.image', 'image')
      .leftJoinAndSelect('related.lessons', 'lessons')
      .leftJoinAndSelect('lessons.videos', 'videos')
      .leftJoinAndSelect('videos.video', 'video')
      .leftJoinAndSelect('lessons.quizzes', 'quizzes')
      .leftJoinAndSelect('related.tags', 'tags')
      .leftJoinAndSelect('related.categories', 'categories')
      .leftJoinAndSelect('related.rates', 'rates')
      .leftJoinAndSelect('related.createdBy', 'createdBy')
      .leftJoin('related.rates', 'rate')
      .select([
        'course',
        'image',
        'lessons',
        'videos',
        'video',
        'quizzes',
        'tags',
        'categories',
        'rates',
        'related',
        'createdBy',
        'AVG(rate.star) as avgStar',
      ])
      .addSelect('AVG(rate.star)', 'avgStar')
      .where(where)
      .groupBy(
        'course.id, image.id, lessons.id, tags.id, categories.id, rates.id, related.id, createdBy.id, videos.id, quizzes.id, video.id',
      )
      .take(5)
      .getOne();
    const courseRelated = courseEntities?.related || [];
    const courses = courseRelated.map((course) => ({
      ...CourseMapper.toDomain(course),
      lessons: course.lessons.length,
      duration: course.lessons.reduce((total, lesson) => {
        return (
          total +
          lesson.videos.reduce((totalVideo, video) => {
            return totalVideo + video.video.duration;
          }, 0)
        );
      }, 0),
      star:
        course.rates.length > 0
          ? course.rates.reduce((total, rate) => total + rate.star, 0) /
            course.rates.length
          : 0,
    }));
    return courses;
  }

  async findManyByTeacherWithPagination({
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
    const createdBy = new UserEntity();
    createdBy.id = teacherId;
    const where: FindOptionsWhere<CourseEntity> = {
      ...filterOptions,
      createdBy,
    };
    const [coursesEntity, total] = await this.coursesRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      relations: ['tags', 'categories', 'createdBy', 'image'],
      order: mapCourseSort(sortOptions?.sortBy),
    });

    const data = coursesEntity.map((course) => CourseMapper.toDomain(course));

    return infinityPagination(data, {
      ...paginationOptions,
      total,
    });
  }

  async findById(id: Course['id']): Promise<NullableType<Course>> {
    const entity = await this.coursesRepository.findOne({
      where: { id },
      relations: [
        'tags',
        'categories',
        'courseVideo',
        'createdBy',
        'image',
        'related.image',
        'related.createdBy',
      ],
    });
    return entity ? CourseMapper.toDomain(entity) : null;
  }

  async findCourseByGuest(
    id: Course['id'],
  ): Promise<NullableType<CourseGuestDto>> {
    const entity = await this.coursesRepository.findOne({
      where: { id },
      relations: [
        'tags',
        'categories',
        'image',
        'courseVideo',
        'createdBy',
        'lessons.videos',
        'lessons.quizzes',
        'related',
      ],
    });

    const result = entity ? CourseMapper.toDomain(entity) : null;
    if (result) {
      return {
        ...result,
        duration: result.lessons.reduce((total, lesson) => {
          return (
            total +
            lesson.videos.reduce((totalVideo, video) => {
              return totalVideo + video.video.duration;
            }, 0)
          );
        }, 0),
      };
    }
    return null;
  }

  async findByIds(ids: Course['id'][]): Promise<Course[]> {
    const entities = await this.coursesRepository.find({
      where: { id: In(ids) },
      relations: ['image'],
    });
    return entities.map(CourseMapper.toDomain);
  }

  async update(
    id: Course['id'],
    payload: Partial<Course>,
  ): Promise<Course | null> {
    const entity = await this.coursesRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Course not found');
    }

    const updatedEntity = await this.coursesRepository.save(
      this.coursesRepository.create(
        CourseMapper.toPersistence({
          ...CourseMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return CourseMapper.toDomain(updatedEntity);
  }

  async remove(id: Course['id']): Promise<void> {
    await this.coursesRepository.softDelete(id);
  }
  async findExceptIds(
    ids: Course['id'][],
    name: Course['name'],
  ): Promise<Course[]> {
    const courses = await this.coursesRepository.find({
      where: {
        id: Not(In(ids)),
        name: ILike(`%${name}%`),
        status: CourseStatusEnum.PUBLIC,
      },
      take: 10,
      relations: ['image', 'createdBy'],
    });
    return courses.map(CourseMapper.toDomain);
  }
  getActiveCoursesInMonth(userId: User['id']): Promise<number> {
    const now = new Date();
    const startDate = startOfMonth(now);
    const endDate = endOfMonth(now);
    return this.coursesRepository.count({
      where: {
        createdBy: {
          id: userId,
        },
        status: CourseStatusEnum.PUBLIC,
        createdAt: Between(startDate, endDate),
      },
    });
  }
  async getPercentActiveCourses(userId: User['id']): Promise<number> {
    const now = new Date();
    const lastMonthDate = subMonths(now, 1);
    const startDate = startOfMonth(lastMonthDate);
    const endDate = endOfMonth(lastMonthDate);
    const totalActiveThisMonth = await this.getActiveCoursesInMonth(userId);
    const totalActiveLastMonth = await this.coursesRepository.count({
      where: {
        createdBy: {
          id: userId,
        },
        createdAt: Between(startDate, endDate),
      },
    });
    return (totalActiveThisMonth / (totalActiveLastMonth || 1)) * 100;
  }

  getTotalCourseInMonth(userId: string): Promise<number> {
    const now = new Date();
    const startDate = startOfMonth(now);
    const endDate = endOfMonth(now);
    return this.coursesRepository.count({
      where: {
        createdBy: {
          id: userId,
        },
        createdAt: Between(startDate, endDate),
      },
    });
  }

  getTotalCourseLastMonth(userId: string): Promise<number> {
    const now = new Date();
    const lastMonthDate = subMonths(now, 1);
    const startDate = startOfMonth(lastMonthDate);
    const endDate = endOfMonth(lastMonthDate);
    return this.coursesRepository.count({
      where: {
        createdBy: {
          id: userId,
        },
        createdAt: Between(startDate, endDate),
      },
    });
  }
}
