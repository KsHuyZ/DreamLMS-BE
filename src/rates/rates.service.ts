import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRateDto } from './dto/create-rate.dto';
import { UpdateRateDto } from './dto/update-rate.dto';
import { RateRepository } from './infrastructure/persistence/rate.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Rate } from './domain/rate';
import { UsersService } from '../users/users.service';
import { CoursesService } from '../courses/courses.service';
import { Course } from '../courses/domain/course';
import { User } from '../users/domain/user';

@Injectable()
export class RatesService {
  constructor(
    private readonly rateRepository: RateRepository,
    private readonly usersService: UsersService,
    private readonly coursesService: CoursesService,
  ) {}

  async create(createRateDto: CreateRateDto & { userId: string }) {
    const { userId, courseId, star } = createRateDto;
    if (star < 1 || star > 5)
      throw new BadRequestException('Star must be between 1 and 5');
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const course = await this.coursesService.findById(courseId);
    if (!course) {
      throw new BadRequestException('Course not found');
    }
    return this.rateRepository.create({ ...createRateDto, user, course });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.rateRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  async findByCourseIdWithPagination({
    paginationOptions,
    courseId,
    userId,
    stars,
  }: {
    paginationOptions: IPaginationOptions;
    courseId: Course['id'];
    userId?: User['id'];
    stars?: Rate['star'][];
  }) {
    const ratePagination =
      await this.rateRepository.findByCourseIdWithPagination({
        paginationOptions: {
          page: paginationOptions.page,
          limit: paginationOptions.limit,
        },
        courseId,
        userId,
        stars,
      });
    const avgRate = await this.rateRepository.getAvgRateByCourseId(courseId);
    const alreadyRated = userId
      ? !!(await this.rateRepository.getRateByCourseIdAndUserId(
          courseId,
          userId,
        ))
      : false;
    console.log({ ...ratePagination, avgRate, alreadyRated });
    return { ...ratePagination, avgRate, alreadyRated };
  }

  findByCourseId(courseId: Rate['course']['id']) {
    return this.rateRepository.findByCourseId(courseId);
  }

  findOne(id: Rate['id']) {
    return this.rateRepository.findById(id);
  }

  update(id: Rate['id'], updateRateDto: UpdateRateDto) {
    return this.rateRepository.update(id, updateRateDto);
  }

  remove(id: Rate['id']) {
    return this.rateRepository.remove(id);
  }
}
