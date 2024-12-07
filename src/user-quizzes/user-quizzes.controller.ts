import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserQuizzesService } from './user-quizzes.service';
import { CreateUserQuizDto } from './dto/create-user-quiz.dto';
import { UpdateUserQuizDto } from './dto/update-user-quiz.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserQuiz } from './domain/user-quiz';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Userquizzes')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'user-quizzes',
  version: '1',
})
export class UserQuizzesController {
  constructor(private readonly user_quizzesService: UserQuizzesService) {}

  @Post()
  @ApiCreatedResponse({
    type: UserQuiz,
  })
  create(@Body() createUserQuizDto: CreateUserQuizDto) {
    return this.user_quizzesService.create(createUserQuizDto);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: string) {
    return this.user_quizzesService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: UserQuiz,
  })
  update(
    @Param('id') id: string,
    @Body() updateUserQuizDto: UpdateUserQuizDto,
  ) {
    return this.user_quizzesService.update(id, updateUserQuizDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.user_quizzesService.remove(id);
  }
}
