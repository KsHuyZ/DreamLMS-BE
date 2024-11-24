import { MoreThan } from 'typeorm';
import { EPayType } from '../../courses/types/course.enum';

export const priceCondition = (payType?: EPayType[]) => {
  if (
    !payType ||
    !payType.length ||
    (payType.includes(EPayType.Free) && payType.includes(EPayType.Paid))
  ) {
    return {};
  }
  if (payType.includes(EPayType.Free)) {
    return {
      price: 0,
    };
  }
  if (payType.includes(EPayType.Paid)) {
    return {
      price: MoreThan(0),
    };
  }
};
