import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class FilterCourseExceptIdsDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsArray()
  ids: string[];
}
