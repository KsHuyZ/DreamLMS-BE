import { Course } from '../../../courses/domain/course';
import { User } from '../../../users/domain/user';
import { NullableType } from '../../../utils/types/nullable.type';
import { Enroll } from '../../domain/enroll';

export abstract class EnrollRepository {
  abstract enrollCourse(data: Omit<Enroll, 'id'>): Promise<Enroll>;

  abstract enrollCourses(data: Omit<Enroll, 'id'>[]): Promise<Enroll[]>;

  abstract findById(id: Enroll['id']): Promise<NullableType<Enroll>>;

  abstract findByUserAndCourseId(
    userId: User['id'],
    courseId: Course['id'],
  ): Promise<NullableType<Enroll>>;

  abstract updateCertificate(id: Enroll['id']): Promise<void>;

  abstract findByUserId(userId: User['id']): Promise<Enroll[]>;

  abstract getTotalEnrolledCoursePriceByWeek(userId: string): Promise<number[]>;

  abstract getTotalEnrolledCoursePriceByDay(userId: string): Promise<number[]>;

  abstract getTotalEnrolledCoursePriceByDayInMonth(
    userId: string,
  ): Promise<number[]>;

  abstract getEnrolledCourseByTeacher(userId: User['id']): Promise<number>;
  abstract getEnrolledLastMonthByTeacher(userId: User['id']): Promise<number>;

  abstract getCompletedCourseInMonth(userId: User['id']): Promise<number>;

  abstract getAnalyzingCompletedCourse(userId: User['id']): Promise<number>;
}
