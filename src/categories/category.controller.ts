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
  UseInterceptors,
  UseGuards,
  UploadedFile,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiConsumes, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { Category } from './domain/category';
import { CategoriesService } from './category.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { RoleEnum } from '../roles/roles.enum';
import { Roles } from '../roles/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Categories')
@Controller({
  path: 'categories',
  version: '1',
})
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiConsumes('multipart/form-data')
  @HttpCode(HttpStatus.CREATED)
  @Roles(RoleEnum.ADMIN)
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile()
    image: Express.Multer.File,
  ): Promise<Category> {
    return this.categoriesService.create({ ...createCategoryDto, image });
  }

  @Get()
  @ApiOkResponse({
    type: Category,
    isArray: true,
  })
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @ApiOkResponse({
    type: Category,
    isArray: true,
  })
  @Get(':name')
  @HttpCode(HttpStatus.OK)
  async findByName(@Param('name') name: string): Promise<Category[]> {
    return this.categoriesService.findByName(name);
  }

  @ApiOkResponse({
    type: Category,
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  update(
    @Param('id') id: Category['id'],
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category | null> {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: Category['id']): Promise<void> {
    return this.categoriesService.remove(id);
  }
}
