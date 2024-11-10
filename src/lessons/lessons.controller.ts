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
@Roles(RoleEnum.ADMIN, RoleEnum.TEACHER)
@UseGuards(AuthGuard('jwt'), RolesGuard)
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
  create(@Body() createLessonDto: CreateLessonDto): Promise<Lesson> {
    return this.lessonsService.create(createLessonDto);
  }

  @ApiOkResponse({
    type: () => Lesson,
  })
  @Put(':id')
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

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @SerializeOptions({
    groups: ['admin', 'teacher'],
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: Lesson['id']): Promise<void> {
    return this.lessonsService.remove(id);
  }
}
