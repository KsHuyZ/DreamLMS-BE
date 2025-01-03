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
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Transaction } from './domain/transaction';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Transactions')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'transactions',
  version: '1',
})
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiCreatedResponse({
    type: Transaction,
  })
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findTransactions(@Request() request) {
    const userId = request.user.id;
    return this.transactionsService.findTransaction(userId);
  }

  @Get('total')
  @HttpCode(HttpStatus.OK)
  getTotalTransaction(@Request() request) {
    const userId = request.user.id;
    return this.transactionsService.getTotalTransaction(userId);
  }

  @Get('received')
  @HttpCode(HttpStatus.OK)
  getTotalReceived(@Request() request) {
    const userId = request.user.id;
    return this.transactionsService.getTotalReceived(userId);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Transaction,
  })
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(id);
  }
}
