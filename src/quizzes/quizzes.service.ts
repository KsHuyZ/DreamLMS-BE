import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { QuizRepository } from './infrastructure/persistence/quiz.repository';
import { Quiz } from './domain/quiz';
import { Transactional } from 'typeorm-transactional';
import { LessonsService } from '../lessons/lessons.service';
import { User } from '../users/domain/user';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
import { UserQuizzesService } from '../user-quizzes/user-quizzes.service';
import { UserQuizAnswersService } from '../user-quiz-answers/user-quiz-answers.service';
import { Question } from '../questions/domain/question';
import { Answer } from '../answers/domain/answer';

@Injectable()
export class QuizzesService {
  constructor(
    private readonly quizRepository: QuizRepository,
    @Inject(forwardRef(() => LessonsService))
    private readonly lessonsService: LessonsService,
    private readonly userQuizAnswersService: UserQuizAnswersService,
    @Inject(forwardRef(() => UserQuizzesService))
    private readonly userQuizzesService: UserQuizzesService,
  ) {}

  @Transactional()
  async create(createQuizDto: CreateQuizDto) {
    const { lessonId } = createQuizDto;
    const lesson = await this.lessonsService.findById(lessonId);
    if (!lesson) {
      throw new BadRequestException('Lesson not found');
    }
    const lastVideoOrder =
      lesson.videos.length > 0
        ? lesson.videos[lesson.videos.length - 1].order
        : 0;
    const lastQuizOrder =
      lesson.quizzes.length > 0
        ? lesson.quizzes[lesson.quizzes.length - 1].order
        : 0;
    const newOrder =
      lastVideoOrder > lastQuizOrder ? lastVideoOrder : lastQuizOrder;
    return this.quizRepository.create({
      ...createQuizDto,
      order: newOrder + 1,
      lesson,
    });
  }

  findOne(id: Quiz['id']) {
    return this.quizRepository.findById(id);
  }

  update(id: Quiz['id'], updateQuizDto: UpdateQuizDto) {
    return this.quizRepository.update(id, updateQuizDto);
  }

  remove(id: Quiz['id']) {
    return this.quizRepository.remove(id);
  }

  @Transactional()
  async submitQuiz(
    id: Quiz['id'],
    userId: User['id'],
    submitQuizDto: SubmitQuizDto[],
  ) {
    const quiz = await this.quizRepository.findById(id);
    if (!quiz) throw new BadRequestException('Quiz not found');
    const totalQuestions = quiz.questions;
    const correctQuestions = submitQuizDto.filter((correctQuestion) => {
      const currentQuestion = totalQuestions.find(
        (question) => question.id === correctQuestion.questionId,
      );
      return currentQuestion?.answers.find(
        (answer) => answer.isCorrect && answer.id === correctQuestion.answerId,
      );
    });
    const score = (correctQuestions.length / totalQuestions.length) * 100;
    const userQuiz = await this.userQuizzesService.findByUserIdAndQuizId({
      userId,
      quizId: id,
    });
    if (!userQuiz) throw new BadRequestException('Quiz not found');
    await this.userQuizzesService.update(userQuiz.id, {
      score,
      isCompleted: true,
    });

    if (score >= 50) {
      const userAnswerLists = submitQuizDto.map((quiz) => {
        const question = new Question();
        question.id = quiz.questionId;
        const answer = new Answer();
        if (quiz.answerId) {
          answer.id = quiz.answerId;
        }
        return { question, answer, userQuiz };
      });
      await this.userQuizAnswersService.createMany(userAnswerLists);
    }

    return score;
  }
}
