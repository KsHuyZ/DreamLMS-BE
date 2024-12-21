import { InfinityPaginationResponseDto } from '../../../utils/dto/infinity-pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Rate } from '../../domain/rate';

export abstract class RateRepository {
  abstract create(
    data: Omit<Rate, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Rate>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Rate[]>;

  abstract findById(id: Rate['id']): Promise<NullableType<Rate>>;

  abstract update(
    id: Rate['id'],
    payload: DeepPartial<Rate>,
  ): Promise<Rate | null>;

  abstract remove(id: Rate['id']): Promise<void>;

  abstract findByCourseId(courseId: Rate['course']['id']): Promise<Rate[]>;

  abstract findByCourseIdWithPagination({
    paginationOptions,
    courseId,
    userId,
    stars,
  }: {
    paginationOptions: IPaginationOptions;
    courseId: Rate['course']['id'];
    userId?: Rate['user']['id'];
    stars?: Rate['star'][];
  }): Promise<InfinityPaginationResponseDto<Rate>>;

  abstract getAvgRateByCourseId(
    courseId: Rate['course']['id'],
  ): Promise<number>;

  abstract getRateByCourseIdAndUserId(
    courseId: Rate['course']['id'],
    userId: Rate['user']['id'],
  ): Promise<NullableType<Rate>>;
}
