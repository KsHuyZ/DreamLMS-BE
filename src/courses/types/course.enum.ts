import { Course } from '../domain/course';

export enum ECourseSort {
  Newest = 'newest',
  MostReviewed = 'most-reviewed',
  HighRated = 'high-rated',
}

export enum EPayType {
  Free = 'Free',
  Paid = 'Paid',
}

export type TCourseQuery = Omit<Course, 'lessons'> & {
  lessons: number;
  star: number;
};

export enum ECourseDuration {
  LessThanOneHour,
  OneToThreeHours,
  ThreeToSixHours,
  SixToSevenTeenHours,
  MoreThanSevenTeenHours,
}
