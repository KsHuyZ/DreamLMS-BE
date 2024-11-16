import { LessonEntity } from '../../../../../lessons/persistence/entities/lesson.entity';
import { QuestionMapper } from '../../../../../questions/infrastructure/persistence/relational/mappers/question.mapper';
import { Quiz } from '../../../../domain/quiz';
import { QuizEntity } from '../entities/quiz.entity';

export class QuizMapper {
  static toDomain(raw: QuizEntity): Quiz {
    const domainEntity = new Quiz();
    domainEntity.id = raw.id;
    domainEntity.order = raw.order;
    domainEntity.title = raw.title;
    domainEntity.description = raw.description;
    domainEntity.disabled = raw.disabled;
    domainEntity.lesson = raw.lesson;
    domainEntity.questions = raw.questions;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    return domainEntity;
  }

  static toPersistence(domainEntity: Quiz): QuizEntity {
    const persistenceEntity = new QuizEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.title = domainEntity.title;
    persistenceEntity.description = domainEntity.description;
    const lessonEntity = new LessonEntity();
    lessonEntity.id = domainEntity.lesson.id;
    persistenceEntity.lesson = lessonEntity;
    persistenceEntity.questions = domainEntity.questions.map((question) =>
      QuestionMapper.toPersistence(question),
    );
    persistenceEntity.order = domainEntity.order;
    persistenceEntity.disabled = domainEntity.disabled;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
