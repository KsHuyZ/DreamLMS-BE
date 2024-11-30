import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CoursesModule } from '../courses/courses.module';
import { StripeController } from './stripe.controller';
import { UsersModule } from '../users/users.module';
import { EnrollsModule } from '../enrolls/enrolls.module';

@Module({
  imports: [CoursesModule, UsersModule, EnrollsModule],
  controllers: [StripeController],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
