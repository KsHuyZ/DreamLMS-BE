import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserVideosService } from './user-videos.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserVideo } from './domain/user-video';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('UserVideos')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'user-videos',
  version: '1',
})
export class UserVideosController {
  constructor(private readonly userVideosService: UserVideosService) {}

  @Post(':videoId')
  @UseGuards(AuthGuard('jwt'))
  @ApiCreatedResponse({
    type: UserVideo,
  })
  create(@Param('videoId') videoId: string, @Request() request) {
    const userId = request.user?.id;
    return this.userVideosService.create({ videoId, userId });
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: string) {
    return this.userVideosService.findOne(id);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.userVideosService.remove(id);
  }
}
