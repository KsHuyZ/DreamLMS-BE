import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
import { TagEntity } from '../entities/tag.entity';
import { NullableType } from '../../../utils/types/nullable.type';
import { TagRepository } from '../tag.repository';
import { TagMapper } from '../mappers/tag.mapper';
import { Tag } from '../../domain/tag';

@Injectable()
export class TagRelationalRepository implements TagRepository {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async findById(id: Tag['id']): Promise<NullableType<Tag>> {
    const entity = await this.tagRepository.findOne({
      where: {
        id,
      },
    });

    return entity ? TagMapper.toDomain(entity) : null;
  }

  async findByName(name: Tag['name']): Promise<Tag[]> {
    const entities = await this.tagRepository.find({
      where: {
        name: ILike(`%${name}%`),
      },
      take: 10,
    });
    return entities.map(TagMapper.toDomain);
  }

  async findManyByIds(ids: Tag['id'][]): Promise<Tag[]> {
    const entities = await this.tagRepository.findBy({ id: In(ids) });
    return entities.map(TagMapper.toDomain);
  }

  create(data: Tag): Promise<Tag> {
    const persistenceModel = TagMapper.toPersistence(data);
    return this.tagRepository.save(this.tagRepository.create(persistenceModel));
  }

  async update(
    id: Tag['id'],
    payload: Partial<Omit<Tag, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>,
  ): Promise<Tag | null> {
    const entity = await this.tagRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Tag not found');
    }

    const updatedEntity = await this.tagRepository.save(
      this.tagRepository.create(
        TagMapper.toPersistence({
          ...TagMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return TagMapper.toDomain(updatedEntity);
  }

  async remove(id: Tag['id']): Promise<void> {
    await this.tagRepository.softDelete({ id });
  }

  async findAll(): Promise<Tag[]> {
    const entities = await this.tagRepository.find();
    return entities.map(TagMapper.toDomain);
  }
}
