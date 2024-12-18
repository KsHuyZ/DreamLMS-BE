import { forwardRef, Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { RelationalCartPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { UsersModule } from '../users/users.module';
import { PaymentsModule } from '../payments/payments.module';

@Module({
  imports: [
    RelationalCartPersistenceModule,
    forwardRef(() => UsersModule),
    PaymentsModule,
  ],
  controllers: [CartsController],
  providers: [CartsService],
  exports: [CartsService, RelationalCartPersistenceModule],
})
export class CartsModule {}
