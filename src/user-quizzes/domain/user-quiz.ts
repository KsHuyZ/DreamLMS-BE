import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';
import { Quiz } from '../../quizzes/domain/quiz';

export class UserQuiz {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  user: User;

  @ApiProperty()
  quiz: Quiz;

  @ApiProperty()
  score: number;

  @ApiProperty()
  isCompleted: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
