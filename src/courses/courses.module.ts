import { forwardRef, Module } from '@nestjs/common';

import { CoursesController } from './courses.controller';

import { CoursesService } from './courses.service';
import { RelationalCoursePersistenceModule } from './infrastructure/persistence/relational/persistence.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { TagsModule } from '../tags/tag.module';
import { CategoriesModule } from '../categories/category.module';
import { UsersModule } from '../users/users.module';
import { CourseVideosModule } from '../course-videos/course-videos.module';
import { EnrollsModule } from '../enrolls/enrolls.module';
import { PaymentsModule } from '../payments/payments.module';
import { UserVideosModule } from '../user-videos/user-videos.module';
import { UserQuizzesModule } from '../user-quizzes/user-quizzes.module';
import { CartsModule } from '../carts/carts.module';
@Module({
  imports: [
    RelationalCoursePersistenceModule,
    CloudinaryModule,
    TagsModule,
    CategoriesModule,
    UsersModule,
    CourseVideosModule,
    forwardRef(() => EnrollsModule),
    PaymentsModule,
    UserVideosModule,
    UserQuizzesModule,
    CartsModule,
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService, RelationalCoursePersistenceModule],
})
export class CoursesModule {}
