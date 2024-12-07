import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';
import { LessonVideo } from '../../lesson-videos/domain/lesson-video';

export class UserVideo {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  user: User;

  @ApiProperty()
  video: LessonVideo;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
