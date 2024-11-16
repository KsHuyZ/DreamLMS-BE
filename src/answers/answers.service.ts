import { Injectable } from '@nestjs/common';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { AnswerRepository } from './infrastructure/persistence/answer.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Answer } from './domain/answer';

@Injectable()
export class AnswersService {
  constructor(private readonly answerRepository: AnswerRepository) {}

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.answerRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

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
