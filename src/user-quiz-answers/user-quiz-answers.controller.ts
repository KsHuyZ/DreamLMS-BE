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
import { UserQuizAnswersService } from './user-quiz-answers.service';
import { CreateUserQuizAnswerDto } from './dto/create-user-quiz-answer.dto';
import { UpdateUserQuizAnswerDto } from './dto/update-user-quiz-answer.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserQuizAnswer } from './domain/user-quiz-answer';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('UserQuizAnswers')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'user-quiz-answers',
  version: '1',
})
export class UserQuizAnswersController {
  constructor(
    private readonly userQuizAnswersService: UserQuizAnswersService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: UserQuizAnswer,
  })
  create(@Body() createUserQuizAnswerDto: CreateUserQuizAnswerDto) {
    return this.userQuizAnswersService.create(createUserQuizAnswerDto);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: string) {
    return this.userQuizAnswersService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: UserQuizAnswer,
  })
  update(
    @Param('id') id: string,
    @Body() updateUserQuizAnswerDto: UpdateUserQuizAnswerDto,
  ) {
    return this.userQuizAnswersService.update(id, updateUserQuizAnswerDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.userQuizAnswersService.remove(id);
  }
}
