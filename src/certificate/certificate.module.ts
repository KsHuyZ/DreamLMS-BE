import { Module } from '@nestjs/common';
import { CertificateController } from './certificate.controller';
import { CertificateService } from './certificate.service';
import { EnrollsModule } from '../enrolls/enrolls.module';
import { CoursesModule } from '../courses/courses.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [CertificateController],
  providers: [CertificateService],
  exports: [CertificateService],
  imports: [EnrollsModule, CoursesModule, UsersModule],
})
export class CertificateModule {}
