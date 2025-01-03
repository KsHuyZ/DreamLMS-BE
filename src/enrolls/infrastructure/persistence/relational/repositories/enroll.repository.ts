import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnrollEntity } from '../entities/enroll.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Enroll } from '../../../../domain/enroll';
import { EnrollRepository } from '../../enroll.repository';
import { EnrollMapper } from '../mappers/enroll.mapper';
import { Course } from '../../../../../courses/domain/course';
import { User } from '../../../../../users/domain/user';
import {
  eachDayOfInterval,
  eachHourOfInterval,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  formatISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

@Injectable()
export class EnrollRelationalRepository implements EnrollRepository {
  constructor(
    @InjectRepository(EnrollEntity)
    private readonly enrollRepository: Repository<EnrollEntity>,
  ) {}

  async enrollCourse(data: Enroll): Promise<Enroll> {
    const persistenceModel = EnrollMapper.toPersistence(data);
    const newEntity = await this.enrollRepository.save(
      this.enrollRepository.create(persistenceModel),
    );
    return EnrollMapper.toDomain(newEntity);
  }

  async findById(id: Enroll['id']): Promise<NullableType<Enroll>> {
    const entity = await this.enrollRepository.findOne({
      where: { id },
    });

    return entity ? EnrollMapper.toDomain(entity) : null;
  }

  async findByUserAndCourseId(
    userId: User['id'],
    courseId: Course['id'],
  ): Promise<NullableType<Enroll>> {
    const entity = await this.enrollRepository.findOne({
      where: {
        course: {
          id: courseId,
        },
        user: {
          id: userId,
        },
      },
    });
    return entity ? EnrollMapper.toDomain(entity) : null;
  }
  async updateCertificate(id: Enroll['id']): Promise<void> {
    await this.enrollRepository.update(id, {
      haveCertificate: true,
    });
  }
  async enrollCourses(data: Omit<Enroll, 'id'>[]): Promise<Enroll[]> {
    const persistenceModel = data.map(EnrollMapper.toPersistence);
    const newEntity = await this.enrollRepository.save(
      this.enrollRepository.create(persistenceModel),
    );
    return newEntity.map(EnrollMapper.toDomain);
  }

  async findByUserId(id: User['id']): Promise<Enroll[]> {
    const entities = await this.enrollRepository.find({
      where: {
        user: {
          id,
        },
      },
      order: {
        createdAt: -1,
      },
      relations: ['course.image', 'course.createdBy'],
    });
    return entities.map(EnrollMapper.toDomain);
  }

  async getTotalEnrolledCoursePriceByWeek(userId: string): Promise<number[]> {
    const weekDate = new Date();
    const startDate = startOfWeek(weekDate, { weekStartsOn: 1 }); // Monday
    const endDate = endOfWeek(weekDate, { weekStartsOn: 1 }); // Sunday

    const daysInWeek = eachDayOfInterval({
      start: startDate,
      end: endDate,
    });

    const dailyTotals: Record<string, number> = {};
    daysInWeek.forEach((day) => {
      dailyTotals[formatISO(day, { representation: 'date' })] = 0; // Use date strings as keys
    });
    const enrollments = await this.enrollRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['course'],
    });
    enrollments.forEach((enrollment) => {
      const day = formatISO(enrollment.createdAt, { representation: 'date' }); // Get the ISO date (YYYY-MM-DD)
      dailyTotals[day] += enrollment.course?.price || 0;
    });

    // Return the totals as an array, ordered by day
    return daysInWeek.map(
      (day) => dailyTotals[formatISO(day, { representation: 'date' })],
    );
  }

  async getTotalEnrolledCoursePriceByDay(userId: string): Promise<number[]> {
    const day = new Date();
    const startOfTheDay = startOfDay(day);
    const endOfTheDay = endOfDay(day);

    // Generate all hours in the day
    const hoursInDay = eachHourOfInterval({
      start: startOfTheDay,
      end: endOfTheDay,
    });

    // Initialize the result with zero for each hour
    const hourlyTotals: Record<string, number> = {};
    hoursInDay.forEach((hour) => {
      hourlyTotals[formatISO(hour, { representation: 'complete' })] = 0; // Key by ISO string
    });

    // Fetch enrollments within the day
    const enrollments = await this.enrollRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['course'], // Fetch related course data
    });

    // Sum course prices by hour
    enrollments.forEach((enrollment) => {
      const hour = formatISO(enrollment.createdAt, {
        representation: 'complete',
      }).slice(0, 13); // Format as ISO hour
      if (!hourlyTotals[`${hour}:00:00.000Z`])
        hourlyTotals[`${hour}:00:00.000Z`] = 0;
    });

    // Return the totals as an array ordered by day
    return hoursInDay.map((hour) => hourlyTotals[formatISO(hour)]);
  }

  async getTotalEnrolledCoursePriceByDayInMonth(
    userId: string,
  ): Promise<number[]> {
    const month = new Date();
    // Define the start and end of the month
    const startOfTheMonth = startOfMonth(month);
    const endOfTheMonth = endOfMonth(month);

    // Generate all days in the month
    const daysInMonth = eachDayOfInterval({
      start: startOfTheMonth,
      end: endOfTheMonth,
    });

    // Initialize the result with zero for each day
    const dailyTotals: Record<string, number> = {};
    daysInMonth.forEach((day) => {
      dailyTotals[format(day, 'yyyy-MM-dd')] = 0; // Use "yyyy-MM-dd" format for daily keys
    });

    // Fetch enrollments within the month
    const enrollments = await this.enrollRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['course'], // Fetch related course data
    });

    // Sum course prices by day
    enrollments.forEach((enrollment) => {
      const day = format(enrollment.createdAt, 'yyyy-MM-dd'); // Get day as "yyyy-MM-dd"
      dailyTotals[day] += enrollment.course?.price || 0;
    });

    // Return the totals as an array, ordered by days in the month
    return daysInMonth.map((day) => dailyTotals[format(day, 'yyyy-MM-dd')]);
  }

  getEnrolledCourseByTeacher(userId: User['id']): Promise<number> {
    return this.enrollRepository.count({
      where: {
        course: {
          createdBy: {
            id: userId,
          },
        },
      },
    });
  }
  async getEnrolledLastMonthByTeacher(userId: User['id']): Promise<number> {
    const totalEnrollThisMonth = await this.getEnrolledCourseByTeacher(userId);
    const totalEnrollLastMonth = await this.enrollRepository.count({
      where: {
        course: {
          createdBy: {
            id: userId,
          },
        },
      },
    });
    return (totalEnrollThisMonth / (totalEnrollLastMonth || 1)) * 100;
  }
  getCompletedCourseInMonth(userId: User['id']): Promise<number> {
    return this.enrollRepository.count({
      where: {
        course: {
          createdBy: {
            id: userId,
          },
        },
        haveCertificate: true,
      },
    });
  }

  async getAnalyzingCompletedCourse(userId: string) {
    const totalEnrollThisMonth = await this.getCompletedCourseInMonth(userId);
    const totalEnrollLastMonth = await this.enrollRepository.count({
      where: {
        course: {
          createdBy: {
            id: userId,
          },
        },
        haveCertificate: true,
      },
    });
    return (totalEnrollThisMonth / (totalEnrollLastMonth || 1)) * 100;
  }
}
