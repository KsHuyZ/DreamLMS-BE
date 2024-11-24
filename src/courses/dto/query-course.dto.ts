import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ECourseSort, EPayType } from '../types/course.enum';
import { LevelsEnum } from '../types/levels.enum';

export class FilterCourseDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Type(() => String)
  name?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Type(() => String)
  rate?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Type(() => String)
  payType?: EPayType[];

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Type(() => String)
  level?: LevelsEnum;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @Type(() => Number)
  duration?: number;
}

export class SortCourseDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  sortBy: ECourseSort;
}

export class QueryCourseDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Type(() => FilterCourseDto)
  filters?: FilterCourseDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Type(() => SortCourseDto)
  sort?: SortCourseDto | null;
}
