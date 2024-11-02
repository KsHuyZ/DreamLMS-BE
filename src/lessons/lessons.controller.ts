import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  HttpStatus,
  HttpCode,
  SerializeOptions,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles/roles.guard';
import { LessonsService } from './lessons.service';
import { Lesson } from './domain/lesson';
import { CreateLessonDto } from './dto/create-lesson.dto';

@ApiBearerAuth()
@Roles(RoleEnum.ADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Lessons')
@Controller({
  path: 'lessons',
  version: '1',
})
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @ApiCreatedResponse({
    type: Lesson,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createLessonDto: CreateLessonDto): Promise<Lesson> {
    return this.lessonsService.create(createLessonDto);
  }

  @ApiOkResponse({
    type: Lesson,
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Get('/course/:id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findByCourseId(@Param('id') id: string): Promise<Lesson[]> {
    return this.lessonsService.findByCourseId(id);
  }
}
