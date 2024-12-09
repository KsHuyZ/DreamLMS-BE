import { Injectable } from '@nestjs/common';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { AnswerRepository } from './infrastructure/persistence/answer.repository';
import { Answer } from './domain/answer';

@Injectable()
export class AnswersService {
  constructor(private readonly answerRepository: AnswerRepository) {}

  findOne(id: Answer['id']) {
    return this.answerRepository.findById(id);
  }

  update(id: Answer['id'], updateAnswerDto: UpdateAnswerDto) {
    return this.answerRepository.update(id, updateAnswerDto);
  }

  remove(id: Answer['id']) {
    return this.answerRepository.remove(id);
  }
}
