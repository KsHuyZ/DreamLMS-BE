import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnrollEntity } from '../entities/enroll.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Enroll } from '../../../../domain/enroll';
import { EnrollRepository } from '../../enroll.repository';
import { EnrollMapper } from '../mappers/enroll.mapper';

@Injectable()
export class EnrollRelationalRepository implements EnrollRepository {
  constructor(
    @InjectRepository(EnrollEntity)
    private readonly enrollRepository: Repository<EnrollEntity>,
  ) {}

  async create(data: Enroll): Promise<Enroll> {
    const persistenceModel = EnrollMapper.toPersistence(data);
    const newEntity = await this.enrollRepository.save(
      this.enrollRepository.create(persistenceModel),
    );
    return EnrollMapper.toDomain(newEntity);
  }

  async findById(id: Enroll['id']): Promise<NullableType<Enroll>> {
    const entity = await this.enrollRepository.findOne({
      where: { id },
    });

    return entity ? EnrollMapper.toDomain(entity) : null;
  }
}
