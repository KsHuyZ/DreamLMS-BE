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
} from '@nestjs/common';
import { UserQuizzesService } from './user-quizzes.service';
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
  constructor(private readonly userQuizzesService: UserQuizzesService) {}

  @Post(':id')
  @ApiCreatedResponse({
    type: UserQuiz,
  })
  @UseGuards(AuthGuard('jwt'))
  create(@Request() request, @Param('id') quizId: string) {
    const userId = request.user.id;
    return this.userQuizzesService.create({ userId, quizId });
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') quizId: string, @Request() request) {
    const userId = request.user.id;
    return this.userQuizzesService.findByUserIdAndQuizId({
      quizId,
      userId,
    });
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
    return this.userQuizzesService.update(id, updateUserQuizDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.userQuizzesService.remove(id);
  }
}
