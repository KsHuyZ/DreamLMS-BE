import { Module } from '@nestjs/common';
import { EnrollRepository } from '../enroll.repository';
import { EnrollRelationalRepository } from './repositories/enroll.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollEntity } from './entities/enroll.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EnrollEntity])],
  providers: [
    {
      provide: EnrollRepository,
      useClass: EnrollRelationalRepository,
    },
  ],
  exports: [EnrollRepository],
})
export class RelationalEnrollPersistenceModule {}
