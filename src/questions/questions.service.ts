import { Injectable } from '@nestjs/common';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionRepository } from './infrastructure/persistence/question.repository';
import { Question } from './domain/question';
import { AnswersService } from '../answers/answers.service';
import { Quiz } from '../quizzes/domain/quiz';
import { User } from '../users/domain/user';
import { UserQuizAnswersService } from '../user-quiz-answers/user-quiz-answers.service';

@Injectable()
export class QuestionsService {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly answerService: AnswersService,
    private readonly userQuizAnswerService: UserQuizAnswersService,
  ) {}

  findByQuizId(id: Quiz['id']) {
    return this.questionRepository.findByQuizId(id);
  }

  async findByQuizIdResult(id: Quiz['id'], userId: User['id']) {
    const userQuizAnswers =
      await this.userQuizAnswerService.findByUserIdAndQuizId(userId, id);
    console.log({ userQuizAnswers });
    const questions = await this.questionRepository.findByQuizId(id);
    return questions.map((question) => {
      const answers = question.answers.map((answer) => ({
        ...answer,
        isSelected: userQuizAnswers.some((quizAnswer) => {
          return quizAnswer.answer.id === answer.id;
        }),
      }));
      return { ...question, answers };
    });
  }

  findOne(id: Question['id']) {
    return this.questionRepository.findById(id);
  }

  update(id: Question['id'], updateQuestionDto: UpdateQuestionDto) {
    return this.questionRepository.update(id, updateQuestionDto);
  }

  remove(id: Question['id']) {
    return this.questionRepository.remove(id);
  }
}
