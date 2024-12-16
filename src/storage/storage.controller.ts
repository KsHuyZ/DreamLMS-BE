import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { StoragesService } from './storage.service';
import { Plan } from './types/plan.enum';

@ApiTags('Storage')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'storages',
  version: '1',
})
export class StoragesController {
  constructor(private readonly storagesService: StoragesService) {}

  @Get()
  getStorageService(@Request() request) {
    const id = request.user.id;
    return this.storagesService.getStorageUsed(id);
  }

  @Post()
  upgradePlans(@Request() request, @Body('plan') plan: Plan) {
    const id = request.user.id as string;
    return this.storagesService.upgradeStorageRequest(plan, id);
  }
}
