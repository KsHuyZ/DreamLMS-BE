import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CoursesModule } from '../courses/courses.module';
import { StripeController } from './stripe.controller';
import { UsersModule } from '../users/users.module';
import { EnrollsModule } from '../enrolls/enrolls.module';
import { StoragesModule } from '../storage/storage.module';

@Module({
  imports: [CoursesModule, UsersModule, EnrollsModule, StoragesModule],
  controllers: [StripeController],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
