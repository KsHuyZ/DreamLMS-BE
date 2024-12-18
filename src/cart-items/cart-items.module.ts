import { Module } from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CartItemsController } from './cart-items.controller';
import { RelationalCartItemPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { CartsModule } from '../carts/carts.module';
import { CoursesModule } from '../courses/courses.module';

@Module({
  imports: [RelationalCartItemPersistenceModule, CartsModule, CoursesModule],
  controllers: [CartItemsController],
  providers: [CartItemsService],
  exports: [CartItemsService, RelationalCartItemPersistenceModule],
})
export class CartItemsModule {}
