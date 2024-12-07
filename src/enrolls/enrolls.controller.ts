import {
  Controller,
  Get,
  Param,
  HttpStatus,
  HttpCode,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { EnrollsService } from './enrolls.service';
import { Enroll } from './domain/enroll';
import { AuthGuard } from '@nestjs/passport';
import { NullableType } from '../utils/types/nullable.type';

@ApiTags('Enrolls')
@Controller({
  path: 'enrolls',
  version: '1',
})
export class EnrollsController {
  constructor(private readonly enrollsService: EnrollsService) {}

  @ApiOkResponse({
    type: Enroll,
  })
  @UseGuards(AuthGuard('jwt'))
  @Get(':courseId')
  @HttpCode(HttpStatus.FOUND)
  create(
    @Param('courseId') courseId: string,
    @Request() request,
  ): Promise<NullableType<Enroll>> {
    const userId = request.user?.id;
    return this.enrollsService.findByCourseAndUserId(userId, courseId);
  }
}
