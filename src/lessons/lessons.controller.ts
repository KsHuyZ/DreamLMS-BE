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
  Put,
  Delete,
  Request,
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
import { UpdateLessonDto } from './dto/update-lesson.dto';

@ApiBearerAuth()
@ApiTags('Lessons')
@Controller({
  path: 'lessons',
  version: '1',
})
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @ApiCreatedResponse({
    type: () => Lesson,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(RoleEnum.ADMIN, RoleEnum.TEACHER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  create(@Body() createLessonDto: CreateLessonDto): Promise<Lesson> {
    return this.lessonsService.create(createLessonDto);
  }

  @ApiOkResponse({
    type: () => Lesson,
  })
  @Put(':id')
  @Roles(RoleEnum.ADMIN, RoleEnum.TEACHER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @HttpCode(HttpStatus.OK)
  update(
    @Body() updateLessonDto: UpdateLessonDto,
    @Param() { id }: { id: string },
  ): Promise<Lesson | null> {
    return this.lessonsService.update(id, updateLessonDto);
  }

  @ApiOkResponse({
    type: () => Lesson,
  })
  @Put('applicable/:id')
  @Roles(RoleEnum.ADMIN, RoleEnum.TEACHER)
  @HttpCode(HttpStatus.OK)
  applicable(
    @Body() payload: { disabled: boolean },
    @Param() { id }: { id: string },
  ): Promise<Lesson | null> {
    return this.lessonsService.update(id, payload);
  }

  @ApiOkResponse({
    type: () => Lesson,
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

  @ApiOkResponse({
    type: () => Lesson,
  })
  @Get('/learn/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findByCourseLearn(
    @Param('id') id: string,
    @Request() request,
  ): Promise<Lesson[]> {
    const userId = request.user.id;
    return this.lessonsService.findByCourseLearn(id, userId);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @SerializeOptions({
    groups: ['admin', 'teacher'],
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.TEACHER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: Lesson['id']): Promise<void> {
    return this.lessonsService.remove(id);
  }
}
