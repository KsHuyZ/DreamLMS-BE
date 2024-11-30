import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CoursesService } from '../courses/courses.service';
import { EnrollsService } from '../enrolls/enrolls.service';

@Injectable()
export class StripeService {
  constructor(
    private readonly usersService: UsersService,
    private readonly coursesService: CoursesService,
    private readonly enrollsService: EnrollsService,
  ) {}
  async paymentCourseSuccess(courseId: string, userId: string) {
    const course = await this.coursesService.findById(courseId);
    if (!course) return;
    const user = await this.usersService.findById(userId);
    if (!user) return;
    const existEnroll = await this.enrollsService.findByCourseAndUserId(
      userId,
      courseId,
    );
    if (existEnroll) return;
    return this.enrollsService.enrollCourse({ course, user });
  }
}
