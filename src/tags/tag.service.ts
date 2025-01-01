import { Injectable } from '@nestjs/common';
import { NullableType } from '../utils/types/nullable.type';
import { DeepPartial } from '../utils/types/deep-partial.type';
import { Tag } from './domain/tag';
import { TagRepository } from './persistence/tag.repository';
import { CreateTagDto } from './dto/create-tag.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class TagsService {
  constructor(
    private readonly tagRepository: TagRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    createTagDto: CreateTagDto & { image: Express.Multer.File },
  ): Promise<Tag> {
    const imagePayload = createTagDto.image;
    const imageResponse =
      await this.cloudinaryService.uploadImage(imagePayload);
    if (imageResponse.http_code) throw new Error('Something went wrong!');
    return this.tagRepository.create({
      ...createTagDto,
      image: imageResponse.url,
    });
  }

  findAll(): Promise<Tag[]> {
    return this.tagRepository.findAll();
  }

  findById(id: Tag['id']): Promise<NullableType<Tag>> {
    return this.tagRepository.findById(id);
  }

  findManyByIds(ids: Tag['id'][]): Promise<Tag[]> {
    return this.tagRepository.findManyByIds(ids);
  }

  update(id: Tag['id'], payload: DeepPartial<Tag>): Promise<Tag | null> {
    return this.tagRepository.update(id, payload);
  }

  findByName(name: string): Promise<Tag[]> {
    return this.tagRepository.findByName(name);
  }

  async remove(id: Tag['id']): Promise<void> {
    await this.tagRepository.remove(id);
  }
}
