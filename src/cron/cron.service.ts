import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  @Cron('*/3 * * * *')
  handleCron() {
    this.logger.debug('Cron job executed every 3 minutes');
  }
}
