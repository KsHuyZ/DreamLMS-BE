import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Request,
} from '@nestjs/common';
import { LessonVideosService } from './lesson-videos.service';
import { CreateLessonVideoDto } from './dto/create-lesson-video.dto';
import { UpdateLessonVideoDto } from './dto/update-lesson-video.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiConsumes,
} from '@nestjs/swagger';
import { LessonVideo } from './domain/lesson-video';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import { User } from '../users/domain/user';

@ApiTags('LessonVideos')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'lesson-videos',
  version: '1',
})
export class LessonVideosController {
  constructor(private readonly lessonVideosService: LessonVideosService) {}

  @Post()
  @ApiCreatedResponse({
    type: LessonVideo,
  })
  @UseInterceptors(
    FileInterceptor('video', {
      storage: diskStorage({
        destination: './video-upload',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = path.extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          cb(null, filename);
        },
      }),
    }),
  )
  @UseGuards(AuthGuard('jwt'))
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() payload: CreateLessonVideoDto,
    @UploadedFile()
    video: Express.Multer.File,
    @Request() request,
  ) {
    const createdBy = request.user as User;
    return this.lessonVideosService.create({ ...payload, video, createdBy });
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: string) {
    return this.lessonVideosService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: LessonVideo,
  })
  @UseInterceptors(
    FileInterceptor('video', {
      storage: diskStorage({
        destination: './video-upload',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = path.extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          cb(null, filename);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Body() updateLessonVideoDto: UpdateLessonVideoDto,
    @UploadedFile() video: Express.Multer.File,
    @Request() request,
  ) {
    const createdBy = request.user as User;
    return this.lessonVideosService.update(id, {
      ...updateLessonVideoDto,
      video,
      createdBy,
    });
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.lessonVideosService.remove(id);
  }
}
