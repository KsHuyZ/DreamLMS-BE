import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { RatesService } from './rates.service';
import { CreateRateDto } from './dto/create-rate.dto';
import { UpdateRateDto } from './dto/update-rate.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Rate } from './domain/rate';
import { AuthGuard } from '@nestjs/passport';
import { FindAllRatesDto } from './dto/find-all-rates.dto';
import { InfinityPaginationResponseDto } from '../utils/dto/infinity-pagination-response.dto';

@ApiTags('Rates')
@ApiBearerAuth()
@Controller({
  path: 'rates',
  version: '1',
})
export class RatesController {
  constructor(private readonly ratesService: RatesService) {}

  @Post()
  @ApiCreatedResponse({
    type: Rate,
  })
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createRateDto: CreateRateDto, @Request() request) {
    const userId = request.user.id;
    return this.ratesService.create({ ...createRateDto, userId });
  }

  @Get('course-pagination/:courseId')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'courseId',
    type: String,
    required: true,
  })
  findByCourseIdWithPagination(
    @Param('courseId') id: string,
    @Query() query: FindAllRatesDto,
    @Request() request,
  ): Promise<
    InfinityPaginationResponseDto<Rate> & {
      avgRate: number;
      alreadyRated: boolean;
    }
  > {
    const userId = request.user.id;
    const { page = 10, limit = 4, stars = [1, 2, 3, 4, 5] } = query;
    return this.ratesService.findByCourseIdWithPagination({
      courseId: id,
      paginationOptions: { page, limit },
      userId,
      stars,
    });
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: string) {
    return this.ratesService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Rate,
  })
  update(@Param('id') id: string, @Body() updateRateDto: UpdateRateDto) {
    return this.ratesService.update(id, updateRateDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.ratesService.remove(id);
  }
}
