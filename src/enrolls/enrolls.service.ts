import { Injectable } from '@nestjs/common';
import { CreateEnrollDto } from './dto/create-enroll.dto';
import { NullableType } from '../utils/types/nullable.type';
import { EnrollRepository } from './infrastructure/persistence/enroll.repository';
import { Enroll } from './domain/enroll';
import { User } from '../users/domain/user';
import { Course } from '../courses/domain/course';

@Injectable()
export class EnrollsService {
  constructor(private readonly enrollsRepository: EnrollRepository) {}

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
}
