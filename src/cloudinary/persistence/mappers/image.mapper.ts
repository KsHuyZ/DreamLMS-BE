import { UserEntity } from '../../../users/infrastructure/persistence/relational/entities/user.entity';
import { Image } from '../../domain/image';
import { ImageEntity } from '../entities/image.entity';

export class ImageMapper {
  static toDomain(raw: ImageEntity): Image {
    const domainEntity = new Image();
    if (raw.id) {
      domainEntity.id = raw.id;
    }
    domainEntity.name = raw.name;
    domainEntity.url = raw.url;
    domainEntity.publicId = raw.publicId;
    domainEntity.size = raw.size;
    domainEntity.format = raw.format;
    domainEntity.createdBy = raw.createdBy;
    return domainEntity;
  }

  static toPersistence(domainEntity: Image): ImageEntity {
    const persistenceEntity = new ImageEntity();
    persistenceEntity.id = domainEntity.id;
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.url = domainEntity.url;
    persistenceEntity.publicId = domainEntity.publicId;
    persistenceEntity.size = domainEntity.size;
    persistenceEntity.format = domainEntity.format;
    const userEntity = new UserEntity();
    userEntity.id = domainEntity.createdBy.id;
    persistenceEntity.createdBy = userEntity;
    return persistenceEntity;
  }
}
