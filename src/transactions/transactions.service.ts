import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionRepository } from './infrastructure/persistence/transaction.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Transaction } from './domain/transaction';

@Injectable()
export class TransactionsService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const { user, course, ...rest } = createTransactionDto;
    return this.transactionRepository.create({ course, user, ...rest });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.transactionRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: Transaction['id']) {
    return this.transactionRepository.findById(id);
  }

  update(id: Transaction['id'], updateTransactionDto: UpdateTransactionDto) {
    return this.transactionRepository.update(id, updateTransactionDto);
  }

  remove(id: Transaction['id']) {
    return this.transactionRepository.remove(id);
  }
}
