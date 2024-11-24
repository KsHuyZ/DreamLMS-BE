import { FindOptionsOrderValue } from 'typeorm';
import { ECourseSort } from '../../courses/types/course.enum';

export const mapCourseSort = (sortBy?: ECourseSort) => {
  if (!sortBy)
    return {
      createdAt: -1 as FindOptionsOrderValue,
    };
  if (sortBy === ECourseSort.Newest)
    return {
      createdAt: -1 as FindOptionsOrderValue,
    };
  // if(sortBy === ECourseSort.HighRated) return '';
  // if(sortBy === ECourseSort.MostReviewed) return '';
  return {
    createdAt: -1 as FindOptionsOrderValue,
  };
};
