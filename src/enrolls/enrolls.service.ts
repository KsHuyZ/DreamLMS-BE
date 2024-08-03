import { Injectable } from '@nestjs/common';
import { CreateEnrollDto } from './dto/create-enroll.dto';
import { NullableType } from '../utils/types/nullable.type';
import { EnrollRepository } from './infrastructure/persistence/enroll.repository';
import { Enroll } from './domain/enroll';

@Injectable()
export class EnrollsService {
  constructor(private readonly enrollsRepository: EnrollRepository) {}

  create(createEnrollDto: CreateEnrollDto): Promise<Enroll> {
    return this.enrollsRepository.create(createEnrollDto);
  }

  findById(id: Enroll['id']): Promise<NullableType<Enroll>> {
    return this.enrollsRepository.findById(id);
  }
}
