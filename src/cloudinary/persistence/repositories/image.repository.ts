import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageRepository } from '../image.repository';
import { Image } from '../../domain/image';
import { ImageEntity } from '../entities/image.entity';
import { ImageMapper } from '../mappers/image.mapper';

@Injectable()
export class ImageRelationalRepository implements ImageRepository {
  constructor(
    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>,
  ) {}
  async create(data: Image): Promise<Image> {
    const imageEntity = ImageMapper.toPersistence(data);
    const newEntity = await this.imageRepository.save(
      this.imageRepository.create(imageEntity),
    );
    return ImageMapper.toDomain(newEntity);
  }

  async remove(id: string): Promise<void> {
    await this.imageRepository.softDelete(id);
  }
  findById(id: string): Promise<Image | null> {
    return this.imageRepository.findOne({
      where: { id },
    });
  }
}
