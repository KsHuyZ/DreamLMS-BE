import { NullableType } from '../../../utils/types/nullable.type';
import { Enroll } from '../../domain/enroll';

export abstract class EnrollRepository {
  abstract create(data: Omit<Enroll, 'id'>): Promise<Enroll>;

  abstract findById(id: Enroll['id']): Promise<NullableType<Enroll>>;
}
