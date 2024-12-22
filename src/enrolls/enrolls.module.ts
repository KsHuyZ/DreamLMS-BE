import { forwardRef, Module } from '@nestjs/common';

import { EnrollsService } from './enrolls.service';

import { RelationalEnrollPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { UsersModule } from '../users/users.module';
import { EnrollsController } from './enrolls.controller';
import { CoursesModule } from '../courses/courses.module';

@Module({
  imports: [
    RelationalEnrollPersistenceModule,
    UsersModule,
    forwardRef(() => CoursesModule),
  ],
  providers: [EnrollsService],
  controllers: [EnrollsController],
  exports: [EnrollsService, RelationalEnrollPersistenceModule],
})
export class EnrollsModule {}
