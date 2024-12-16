// We use class-transformer in schema and domain entity.
// We duplicate these rules because you can choose not to use adapters
// in your project and return an schema entity directly in response.
import { Exclude, Expose } from 'class-transformer';
import { AuthProvidersEnum } from '../../../../../auth/auth-providers.enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  AfterLoad,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { EnrollEntity } from '../../../../../enrolls/infrastructure/persistence/relational/entities/enroll.entity';
import { RoleEnum } from '../../../../../roles/roles.enum';
import { StatusEnum } from '../../../../../statuses/statuses.enum';
import { UserVideoEntity } from '../../../../../user-videos/infrastructure/persistence/relational/entities/user-video.entity';
import { DiskEnum } from '../../../../types/disk.enum';

@Entity({
  name: 'users',
})
export class UserEntity extends EntityRelationalHelper {
  @ApiProperty({
    type: String,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: String,
    example: 'john.doe@example.com',
  })
  @Column({ type: String, unique: true, nullable: true })
  @Expose({ groups: ['me', 'admin'] })
  email: string | null;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password?: string;

  @Exclude({ toPlainOnly: true })
  public previousPassword?: string;

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

  @ApiProperty({
    type: String,
    example: 'email',
  })
  @Column({ default: AuthProvidersEnum.email })
  @Expose({ groups: ['me', 'admin'] })
  provider: string;

  @ApiProperty({
    type: String,
    example: '1234567890',
  })
  @Index()
  @Column({ type: String, nullable: true })
  @Expose({ groups: ['me', 'admin'] })
  socialId?: string | null;

  @ApiProperty({
    type: String,
    example: 'John',
  })
  @Index()
  @Column({ type: String, nullable: true })
  firstName: string | null;

  @ApiProperty({
    type: String,
    example: 'Doe',
  })
  @Index()
  @Column({ type: String, nullable: true })
  lastName: string | null;

  @ApiProperty({
    type: String,
  })
  @Column({ type: String, nullable: true })
  photo?: string | null;

  @ApiProperty({
    enum: RoleEnum,
    example: RoleEnum.STUDENT,
  })
  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.STUDENT,
    name: 'role',
  })
  role?: RoleEnum;

  @ApiProperty({
    enum: StatusEnum,
    example: StatusEnum.ACTIVE,
  })
  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.INACTIVE,
    name: 'status',
  })
  status?: StatusEnum;

  @ManyToMany(() => EnrollEntity, (enrolledCourse) => enrolledCourse.user)
  enrolledCourses: EnrollEntity[];

  @OneToMany(() => UserVideoEntity, (userVideo) => userVideo.user)
  userVideos: UserVideoEntity[];

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date | null;

  @Column({ nullable: true })
  facebook?: string;

  @Column({ nullable: true })
  instagram?: string;

  @Column({ nullable: true })
  github?: string;

  @Column({ nullable: true })
  x?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  banner?: string;

  @Column({ nullable: true })
  walletAddress?: string;

  @Column({ default: 1 })
  totalStorage: number;

  @Column({ default: DiskEnum.GB, enum: DiskEnum })
  unit: DiskEnum;
}
