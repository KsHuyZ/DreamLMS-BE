import { BadRequestException, Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import fetchContract from '../utils/fetch-contract';
import { ConfigService } from '@nestjs/config';
import { EnrollsService } from '../enrolls/enrolls.service';
import { Transactional } from 'typeorm-transactional';
import { CoursesService } from '../courses/courses.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class CertificateService {
  private contractInstance: ethers.Contract;

  constructor(
    private readonly configService: ConfigService,
    private readonly enrollsService: EnrollsService,
    private readonly coursesService: CoursesService,
    private readonly usersService: UsersService,
  ) {
    const contractAddress = this.configService.get<string>(
      'certificate.contractAddress',
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

  async getCertificateByUserId(userId: string) {
    const certificates = await this.contractInstance.getResultsByUserId(userId);
    const courseIds: string[] = certificates.map(
      (certificate) => certificate[1],
    );

    const courses = await this.coursesService.findManyByIds(courseIds);

    return courses.map((course, index) => ({
      course,
      timestamp: Number(certificates[index][2]) * 1000,
    }));
  }

  async getCertificateByCourseId(courseId: string) {
    const certificates =
      await this.contractInstance.getResultsByCourseId(courseId);
    return certificates.map((certificate) => ({
      userId: certificate[0],
      courseId: certificate[1],
      timestamp: Number(certificate[3]) * 1000,
    }));
  }

  async getCertificateByUserIdAndCourseId(userId: string, courseId: string) {
    const certificate =
      await this.contractInstance.getResultByUserIdAndCourseId(
        userId,
        courseId,
      );
    if (!certificate) throw new BadRequestException('Certificate not found');
    const course = await this.coursesService.findById(courseId);
    const user = await this.usersService.findById(userId);
    return {
      user,
      course,
      timestamp: Number(certificate[2]) * 1000,
    };
  }

  @Transactional()
  async createCertificate(userId: string, courseId: string) {
    const enroll = await this.enrollsService.findByCourseAndUserId(
      userId,
      courseId,
    );
    if (!enroll)
      throw new BadRequestException('Please enroll this course first');
    if (enroll.haveCertificate)
      throw new BadRequestException('You already have certificate');
    await this.enrollsService.updateCertificate(enroll.id);
    return this.contractInstance.createCertificate(userId, courseId);
  }
}
