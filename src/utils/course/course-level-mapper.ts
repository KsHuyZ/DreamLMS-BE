import { LevelsEnum } from '../../courses/types/levels.enum';

export const levelCourseMapper = (level?: LevelsEnum) => {
  if (level === LevelsEnum.ALL) return {};
  return { level };
};
