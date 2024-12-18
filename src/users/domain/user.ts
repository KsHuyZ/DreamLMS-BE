import { Exclude, Expose } from 'class-transformer';
import { ApiResponseProperty } from '@nestjs/swagger';
import { ManyToMany } from 'typeorm';
import { Enroll } from '../../enrolls/domain/enroll';
import { RoleEnum } from '../../roles/roles.enum';
import { StatusEnum } from '../../statuses/statuses.enum';
import { DiskEnum } from '../types/disk.enum';
import { Cart } from '../../carts/domain/cart';

export class User {
  @ApiResponseProperty({
    type: String,
  })
  id: string;

  @ApiResponseProperty({
    type: String,
    example: 'john.doe@example.com',
  })
  @Expose({ groups: ['me', 'admin'] })
  email: string | null;

  @Exclude({ toPlainOnly: true })
  password?: string;

  @Exclude({ toPlainOnly: true })
  previousPassword?: string;

  @ApiResponseProperty({
    type: String,
    example: 'email',
  })
  @Expose({ groups: ['me', 'admin'] })
  provider: string;

  @ApiResponseProperty({
    type: String,
    example: '1234567890',
  })
  @Expose({ groups: ['me', 'admin'] })
  socialId?: string | null;

  @ApiResponseProperty({
    type: String,
    example: 'John',
  })
  firstName: string | null;

  @ApiResponseProperty({
    type: String,
    example: 'Doe',
  })
  lastName: string | null;

  @ApiResponseProperty({
    type: String,
  })
  photo?: string | null;

  @ApiResponseProperty({
    enum: RoleEnum,
  })
  role?: RoleEnum;

  @ApiResponseProperty({
    enum: StatusEnum,
  })
  status?: StatusEnum;

  @ManyToMany(() => Enroll, (enrolledCourse) => enrolledCourse.user)
  enrolledCourses: Enroll[];

  @ApiResponseProperty()
  createdAt: Date;

  @ApiResponseProperty()
  updatedAt: Date;

  @ApiResponseProperty()
  deletedAt: Date | null;

  @ApiResponseProperty()
  facebook?: string;

  @ApiResponseProperty()
  instagram?: string;

  @ApiResponseProperty()
  github?: string;

  @ApiResponseProperty()
  x?: string;

  @ApiResponseProperty()
  description?: string;

  @ApiResponseProperty()
  banner?: string;

  @ApiResponseProperty()
  walletAddress?: string;

  @ApiResponseProperty()
  totalStorage: number;

  @ApiResponseProperty()
  unit: DiskEnum;

  // @ApiResponseProperty()
  cart: Cart;
}
