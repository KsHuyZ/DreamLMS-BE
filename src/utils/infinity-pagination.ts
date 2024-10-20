import { IPaginationOptions } from './types/pagination-options';
import { InfinityPaginationResponseDto } from './dto/infinity-pagination-response.dto';

export const infinityPagination = <T>(
  data: T[],
  options: IPaginationOptions & { total: number },
): InfinityPaginationResponseDto<T> => {
  const { limit, page, total } = options;
  return {
    data,
    limit,
    page,
    pages: Math.ceil(total / limit),
    total,
  };
};
