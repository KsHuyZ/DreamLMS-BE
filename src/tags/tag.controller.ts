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
} from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { Tag } from './domain/tag';
import { TagsService } from './tag.service';

@ApiTags('Tags')
@Controller({
  path: 'tags',
  version: '1',
})
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @ApiCreatedResponse({
    type: Tag,
    isArray: true,
  })
  @ApiBody({
    type: CreateTagDto,
    isArray: true,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createMany(@Body() createTagDto: CreateTagDto[]): Promise<Tag[]> {
    return this.tagsService.createMany(createTagDto);
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
