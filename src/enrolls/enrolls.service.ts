import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateEnrollDto } from './dto/create-enroll.dto';
import { NullableType } from '../utils/types/nullable.type';
import { EnrollRepository } from './infrastructure/persistence/enroll.repository';
import { Enroll } from './domain/enroll';
import { User } from '../users/domain/user';
import { Course } from '../courses/domain/course';
import { CoursesService } from '../courses/courses.service';
import { ethers } from 'ethers';
import { ConfigService } from '@nestjs/config';
import fetchContract from '../utils/fetch-contract';
import { UsersService } from '../users/users.service';

@Injectable()
export class EnrollsService {
  private contractInstance: ethers.Contract;
  constructor(
    private readonly configService: ConfigService,
    private readonly enrollsRepository: EnrollRepository,
    @Inject(forwardRef(() => CoursesService))
    private readonly coursesService: CoursesService,
    private readonly usersService: UsersService,
  ) {
    const contractAddress = this.configService.get<string>(
      'enroll.contractAddress',
      {
        infer: true,
      },
    );
    const ApiUrl = this.configService.get<string>('certificate.apiUrl', {
      infer: true,
    });
    const privateKey = this.configService.get<string>(
      'certificate.privateKey',
      {
        infer: true,
      },
    );
    const contractInstance = fetchContract(ApiUrl, privateKey, contractAddress);
    if (!contractInstance) {
      throw new Error('Failed to initialize contract instance');
    }
    this.contractInstance = contractInstance;
  }

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

  async checkAlreadyPay(userId: User['id'], courseId: Course['id']) {
    const enrollContractResult =
      await this.contractInstance.getByUserIdAndCourseId(userId, courseId);
    if (!enrollContractResult)
      throw new BadRequestException('You are not completed transaction!');
    const course = await this.coursesService.findById(courseId);
    if (!course) throw new BadRequestException('Course not found!');
    const user = await this.usersService.findById(userId);
    if (!user) throw new BadRequestException('User not found!');
    return this.enrollsRepository.enrollCourse({ course, user });
  }
}
