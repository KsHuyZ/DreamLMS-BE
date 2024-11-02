import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { RelationalVideoPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalVideoPersistenceModule],
  controllers: [VideosController],
  providers: [VideosService],
  exports: [VideosService, RelationalVideoPersistenceModule],
})
export class VideosModule {}
