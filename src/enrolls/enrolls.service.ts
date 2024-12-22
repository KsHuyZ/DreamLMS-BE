import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateEnrollDto } from './dto/create-enroll.dto';
import { NullableType } from '../utils/types/nullable.type';
import { EnrollRepository } from './infrastructure/persistence/enroll.repository';
import { Enroll } from './domain/enroll';
import { User } from '../users/domain/user';
import { Course } from '../courses/domain/course';
import { CoursesService } from '../courses/courses.service';

@Injectable()
export class EnrollsService {
  constructor(
    private readonly enrollsRepository: EnrollRepository,
    @Inject(forwardRef(() => CoursesService))
    private readonly coursesService: CoursesService,
  ) {}

  enrollCourse(createEnrollDto: CreateEnrollDto): Promise<Enroll> {
    return this.enrollsRepository.enrollCourse(createEnrollDto);
  }

  enrollCourses(payload: CreateEnrollDto[]): Promise<Enroll[]> {
    return this.enrollsRepository.enrollCourses(payload);
  }

  findById(id: Enroll['id']): Promise<NullableType<Enroll>> {
    return this.enrollsRepository.findById(id);
  }

  findByCourseAndUserId(userId: User['id'], courseId: Course['id']) {
    return this.enrollsRepository.findByUserAndCourseId(userId, courseId);
  }

  updateCertificate(id: Enroll['id']) {
    return this.enrollsRepository.updateCertificate(id);
  }

  async findByUserId(id: User['id']) {
    const enrolls = await this.enrollsRepository.findByUserId(id);
    return enrolls.map(async (enroll) => {
      const courseId = enroll.course.id;
      const progress = await this.coursesService.getCourseProgress(
        courseId,
        id,
      );
      return { ...enroll.course, progress };
    });
  }
}
