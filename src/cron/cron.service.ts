import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  @Cron('*/10 * * * *')
  handleCron() {
    return fetch(
      process.env.BACKEND_DOMAIN ?? 'https://eduwisebe.onrender.com',
    );
  }
}
