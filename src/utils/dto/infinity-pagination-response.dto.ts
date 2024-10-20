import { Type } from '@nestjs/common';
import { ApiResponseProperty } from '@nestjs/swagger';

export class InfinityPaginationResponseDto<T> {
  data: T[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

export function InfinityPaginationResponse<T>(classReference: Type<T>) {
  abstract class Pagination {
    @ApiResponseProperty({ type: [classReference] })
    data!: T[];

    @ApiResponseProperty({
      type: Number,
    })
    total: number;

    @ApiResponseProperty({
      type: Number,
    })
    limit: number;

    @ApiResponseProperty({
      type: Number,
    })
    page: number;

    @ApiResponseProperty({
      type: Number,
    })
    pages: number;
  }

  Object.defineProperty(Pagination, 'name', {
    writable: false,
    value: `InfinityPagination${classReference.name}ResponseDto`,
  });

  return Pagination;
}
