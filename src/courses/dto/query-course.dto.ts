import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { Course } from '../domain/course';
import { CourseStatusEnum } from '../../statuses/statuses.enum';

export class FilterCourseDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Type(() => String)
  name?: string;

  @ApiPropertyOptional({ type: CourseStatusEnum })
  @IsOptional()
  @Type(() => String)
  status?: CourseStatusEnum;
}

export class SortCourseDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Course;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryCourseDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(FilterCourseDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterCourseDto)
  filters?: FilterCourseDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) => {
    return value
      ? plainToInstance(SortCourseDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortCourseDto)
  sort?: SortCourseDto[] | null;
}
