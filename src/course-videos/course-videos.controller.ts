import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  Request,
  UploadedFile,
} from '@nestjs/common';
import { CourseVideosService } from './course-videos.service';
import { CreateCourseVideoDto } from './dto/create-course-video.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CourseVideo } from './domain/course-video';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import { User } from '../users/domain/user';

@ApiTags('CourseVideos')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'course-videos',
  version: '1',
})
export class CourseVideosController {
  constructor(private readonly courseVideosService: CourseVideosService) {}

  @Post()
  @ApiCreatedResponse({
    type: CourseVideo,
  })
  @UseInterceptors(
    FileInterceptor('video', {
      storage: diskStorage({
        destination: './video-upload',
        filename: (_, file, cb) => {
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
  create(
    @Body() createCourseVideoDto: CreateCourseVideoDto,
    @Request() request,
    @UploadedFile()
    video: Express.Multer.File,
  ) {
    const createdBy = request.user as User;
    return this.courseVideosService.create({
      ...createCourseVideoDto,
      createdBy,
      video,
    });
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: string) {
    return this.courseVideosService.findOne(id);
  }

  // @Patch(':id')
  // @ApiParam({
  //   name: 'id',
  //   type: String,
  //   required: true,
  // })
  // @ApiOkResponse({
  //   type: CourseVideo,
  // })
  // update(
  //   @Param('id') id: string,
  //   @Body() updateCourseVideoDto: UpdateCourseVideoDto,
  // ) {
  //   return this.courseVideosService.update(id, updateCourseVideoDto);
  // }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.courseVideosService.remove(id);
  }
}
