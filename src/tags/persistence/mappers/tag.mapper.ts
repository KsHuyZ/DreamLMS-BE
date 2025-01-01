import { Tag } from '../../domain/tag';
import { TagEntity } from '../entities/tag.entity';

export class TagMapper {
  static toDomain(raw: TagEntity): Tag {
    const domainEntity = new Tag();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.image = raw.image;
    return domainEntity;
  }

  static toPersistence(domainEntity: Tag): TagEntity {
    const persistenceEntity = new TagEntity();
    persistenceEntity.id = domainEntity.id;
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.image = domainEntity.image;
    return persistenceEntity;
  }
}
