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
@UseGuards(AuthGuard('jwt'))
export class EnrollsController {
  constructor(private readonly enrollsService: EnrollsService) {}

  @ApiOkResponse({
    type: Enroll,
  })
  @Get('me')
  @HttpCode(HttpStatus.OK)
  findByUserId(@Request() request) {
    const userId = request.user.id as string;
    return this.enrollsService.findByUserId(userId);
  }
  @ApiOkResponse({
    type: Enroll,
  })
  @Get('enroll-contract/:courseId')
  @HttpCode(HttpStatus.OK)
  enrollContract(@Request() request, @Param('courseId') courseId: string) {
    const userId = request.user.id;
    return this.enrollsService.checkAlreadyPay(userId, courseId);
  }

  @Get()
  @ApiOkResponse({
    type: Enroll,
  })
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
