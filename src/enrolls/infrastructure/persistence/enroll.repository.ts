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
}
