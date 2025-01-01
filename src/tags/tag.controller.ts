import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { Tag } from './domain/tag';
import { TagsService } from './tag.service';
import { RoleEnum } from '../roles/roles.enum';
import { Roles } from '../roles/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Tags')
@Controller({
  path: 'tags',
  version: '1',
})
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @ApiCreatedResponse({
    type: Tag,
  })
  @ApiBody({
    type: CreateTagDto,
  })
  @ApiConsumes('multipart/form-data')
  @HttpCode(HttpStatus.CREATED)
  @Roles(RoleEnum.ADMIN)
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createTagDto: CreateTagDto,
    @UploadedFile()
    image: Express.Multer.File,
  ): Promise<Tag> {
    return this.tagsService.create({ ...createTagDto, image });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Tag[]> {
    return this.tagsService.findAll();
  }

  @ApiOkResponse({
    type: Tag,
    isArray: true,
  })
  @Get(':name')
  @HttpCode(HttpStatus.OK)
  async findByName(@Param('name') name: string): Promise<Tag[]> {
    return this.tagsService.findByName(name);
  }

  @ApiOkResponse({
    type: Tag,
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  update(
    @Param('id') id: Tag['id'],
    @Body() updateTagDto: UpdateTagDto,
  ): Promise<Tag | null> {
    return this.tagsService.update(id, updateTagDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: Tag['id']): Promise<void> {
    return this.tagsService.remove(id);
  }
}
