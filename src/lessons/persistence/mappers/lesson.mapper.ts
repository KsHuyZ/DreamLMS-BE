import { Course } from '../../../courses/domain/course';
import { CourseEntity } from '../../../courses/infrastructure/persistence/relational/entities/course.entity';
import { QuizEntity } from '../../../quizzes/infrastructure/persistence/relational/entities/quiz.entity';
import { VideoEntity } from '../../../videos/infrastructure/persistence/relational/entities/video.entity';
import { Lesson } from '../../domain/lesson';
import { LessonEntity } from '../entities/lesson.entity';

export class LessonMapper {
  static toDomain(raw: LessonEntity): Lesson {
    const domainEntity = new Lesson();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.description = raw.description;
    domainEntity.order = raw.order;
    const course = new Course();
    if (raw.course) {
      course.id = raw.course.id;
    }
    domainEntity.course = course;
    domainEntity.disabled = raw.disabled;
    if (raw.quizzes) {
      domainEntity.quizzes = raw.quizzes;
    }
    if (raw.videos) {
      domainEntity.videos = raw.videos;
    }
    return domainEntity;
  }

  static toPersistence(domainEntity: Lesson): LessonEntity {
    const persistenceEntity = new LessonEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.order = domainEntity.order;
    const courseEntity = new CourseEntity();
    courseEntity.id = domainEntity.course.id;
    persistenceEntity.course = courseEntity;
    if (domainEntity.videos) {
      persistenceEntity.videos = domainEntity.videos.map((video) => {
        const videoEntity = new VideoEntity();
        videoEntity.id = video.id;
        return videoEntity;
      });
    }
    if (domainEntity.quizzes) {
      persistenceEntity.quizzes = domainEntity.quizzes.map((quiz) => {
        const quizEntity = new QuizEntity();
        quizEntity.id = quiz.id;
        return quizEntity;
      });
    }
    persistenceEntity.disabled = domainEntity.disabled;
    return persistenceEntity;
  }
}
