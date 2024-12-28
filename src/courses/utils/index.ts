import { ECourseDuration } from '../types/course.enum';

export const mapDuration = (duration: ECourseDuration) => {
  console.log({ duration });
  switch (duration) {
    case ECourseDuration.LessThanOneHour:
      return [0, 3600];
    case ECourseDuration.OneToThreeHours:
      return [3600, 10800];
    case ECourseDuration.ThreeToSixHours:
      return [10800, 21600];
    case ECourseDuration.SixToSevenTeenHours:
      return [21600, 61200];
    default:
      return [61200];
  }
};
