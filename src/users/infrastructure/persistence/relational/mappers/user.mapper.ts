import { User } from '../../../../domain/user';
import { UserEntity } from '../entities/user.entity';

export class UserMapper {
  static toDomain(raw: UserEntity): User {
    const domainEntity = new User();
    domainEntity.id = raw.id;
    domainEntity.email = raw.email;
    domainEntity.password = raw.password;
    domainEntity.previousPassword = raw.previousPassword;
    domainEntity.provider = raw.provider;
    domainEntity.socialId = raw.socialId;
    domainEntity.firstName = raw.firstName;
    domainEntity.lastName = raw.lastName;
    domainEntity.photo = raw.photo;
    domainEntity.role = raw.role;
    domainEntity.status = raw.status;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;
    domainEntity.facebook = raw.facebook;
    domainEntity.instagram = raw.instagram;
    domainEntity.x = raw.x;
    domainEntity.github = raw.github;
    domainEntity.description = raw.description;
    domainEntity.banner = raw.banner;
    domainEntity.walletAddress = raw.walletAddress;
    domainEntity.totalStorage = raw.totalStorage;
    domainEntity.unit = raw.unit;
    return domainEntity;
  }

  static toPersistence(domainEntity: User): UserEntity {
    const persistenceEntity = new UserEntity();
    persistenceEntity.id = domainEntity.id;
    persistenceEntity.email = domainEntity.email;
    persistenceEntity.password = domainEntity.password;
    persistenceEntity.previousPassword = domainEntity.previousPassword;
    persistenceEntity.provider = domainEntity.provider;
    persistenceEntity.socialId = domainEntity.socialId;
    persistenceEntity.firstName = domainEntity.firstName;
    persistenceEntity.lastName = domainEntity.lastName;
    persistenceEntity.photo = domainEntity.photo;
    persistenceEntity.role = domainEntity.role;
    persistenceEntity.status = domainEntity.status;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.deletedAt = domainEntity.deletedAt;
    persistenceEntity.github = domainEntity.github;
    persistenceEntity.facebook = domainEntity.facebook;
    persistenceEntity.x = domainEntity.x;
    persistenceEntity.instagram = domainEntity.instagram;
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.banner = domainEntity.banner;
    persistenceEntity.walletAddress = domainEntity.walletAddress;
    persistenceEntity.totalStorage = domainEntity.totalStorage;
    persistenceEntity.unit = domainEntity.unit;
    return persistenceEntity;
  }
}
