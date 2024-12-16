import { Injectable } from '@nestjs/common';
import { User } from '../users/domain/user';
import { VideosService } from '../videos/videos.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UsersService } from '../users/users.service';
import { Plan } from './types/plan.enum';
import { PaymentsService } from '../payments/payments.service';
@Injectable()
export class StoragesService {
  constructor(
    private readonly videosService: VideosService,
    private readonly imagesService: CloudinaryService,
    private readonly usersService: UsersService,
    private readonly paymentsService: PaymentsService,
  ) {}

  async getStorageUsed(userId: User['id']) {
    const totalVideoSize = (await this.videosService.getTotalSize(userId)) || 0;
    const totalImageSize = (await this.imagesService.getTotalSize(userId)) || 0;
    return totalImageSize + totalVideoSize;
  }

  async upgradePlan(userId: User['id'], plan: Plan) {
    const newDiskSize =
      plan === Plan.Standard ? 10 : plan === Plan.Advanced ? 20 : 50;
    await this.usersService.upgradePlans(userId, newDiskSize);
  }

  upgradeStorageRequest(plan: Plan, userId: User['id']) {
    const amount =
      plan === Plan.Standard ? 10 : plan === Plan.Advanced ? 18 : 45;
    return this.paymentsService.createPaymentUpgradePlans(plan, userId, amount);
  }
}
