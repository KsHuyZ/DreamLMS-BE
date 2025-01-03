import { InfinityPaginationResponseDto } from '../../../utils/dto/infinity-pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { User } from '../../domain/user';

import { FilterUserDto, SortUserDto } from '../../dto/query-user.dto';
import { UpdateProfileDto } from '../../dto/update-profile.dto';

export abstract class UserRepository {
  abstract create(
    data: Omit<
      User,
      | 'id'
      | 'createdAt'
      | 'deletedAt'
      | 'updatedAt'
      | 'enrolledCourses'
      | 'unit'
      | 'totalStorage'
    >,
  ): Promise<User>;

  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<InfinityPaginationResponseDto<User>>;

  abstract findById(id: User['id']): Promise<NullableType<User>>;
  abstract findByEmail(email: User['email']): Promise<NullableType<User>>;
  abstract findBySocialIdAndProvider({
    socialId,
    provider,
  }: {
    socialId: User['socialId'];
    provider: User['provider'];
  }): Promise<NullableType<User>>;

  abstract update(
    id: User['id'],
    payload: DeepPartial<User>,
  ): Promise<User | null>;

  abstract remove(id: User['id']): Promise<void>;

  abstract updateProfile(
    id: User['id'],
    payload: UpdateProfileDto,
  ): Promise<void>;

  abstract upgradePlans(id: User['id'], diskSize: number): Promise<void>;

  abstract uploadAvatar(id: User['id'], photo: string): Promise<void>;
}
