// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateCourseVideoDto } from './create-course-video.dto';

export class UpdateCourseVideoDto extends PartialType(CreateCourseVideoDto) {}
