import { Module } from '@nestjs/common';
import { RateRepository } from '../rate.repository';
import { RateRelationalRepository } from './repositories/rate.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RateEntity } from './entities/rate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RateEntity])],
  providers: [
    {
      provide: RateRepository,
      useClass: RateRelationalRepository,
    },
  ],
  exports: [RateRepository],
})
export class RelationalRatePersistenceModule {}
