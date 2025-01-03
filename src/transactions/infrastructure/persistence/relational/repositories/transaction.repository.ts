import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionEntity } from '../entities/transaction.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Transaction } from '../../../../domain/transaction';
import { TransactionRepository } from '../../transaction.repository';
import { TransactionMapper } from '../mappers/transaction.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { User } from '../../../../../users/domain/user';
import { AmountUnit } from '../../../../types/amount.unit';

@Injectable()
export class TransactionRelationalRepository implements TransactionRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
  ) {}

  async create(data: Transaction): Promise<Transaction> {
    const persistenceModel = TransactionMapper.toPersistence(data);
    const newEntity = await this.transactionRepository.save(
      this.transactionRepository.create(persistenceModel),
    );
    return TransactionMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Transaction[]> {
    const entities = await this.transactionRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((user) => TransactionMapper.toDomain(user));
  }

  async findById(id: Transaction['id']): Promise<NullableType<Transaction>> {
    const entity = await this.transactionRepository.findOne({
      where: { id },
    });

    return entity ? TransactionMapper.toDomain(entity) : null;
  }

  async update(
    id: Transaction['id'],
    payload: Partial<Transaction>,
  ): Promise<Transaction> {
    const entity = await this.transactionRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.transactionRepository.save(
      this.transactionRepository.create(
        TransactionMapper.toPersistence({
          ...TransactionMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return TransactionMapper.toDomain(updatedEntity);
  }

  async remove(id: Transaction['id']): Promise<void> {
    await this.transactionRepository.delete(id);
  }

  async findTransaction(id: User['id']): Promise<Transaction[]> {
    const transactions = await this.transactionRepository.find({
      where: {
        user: {
          id,
        },
      },
      relations: ['course.image'],
    });
    return transactions.map(TransactionMapper.toDomain);
  }

  async getTotalAmount(userId: User['id']) {
    const transactions = await this.transactionRepository.find({
      where: { user: { id: userId } },
    });
    let eth = 0;
    let dollar = 0;
    transactions.forEach((transaction) => {
      if (transaction.amountUnit === AmountUnit.Dollar) {
        dollar += +transaction.amount;
      } else {
        eth += +transaction.amount;
      }
    });
    return { dollar, eth };
  }

  async getTotalReceived(id: string) {
    const transactions = await this.transactionRepository.find({
      where: {
        course: {
          createdBy: {
            id,
          },
        },
      },
      relations: ['user', 'course.image'],
    });
    let eth = 0;
    let dollar = 0;
    transactions.forEach((transaction) => {
      if (transaction.amountUnit === AmountUnit.Dollar) {
        dollar += +transaction.amount;
      } else {
        eth += +transaction.amount;
      }
    });
    return { dollar, eth };
  }
}
