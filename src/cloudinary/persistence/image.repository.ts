import { NullableType } from '../../utils/types/nullable.type';
import { Image } from '../domain/image';

export abstract class ImageRepository {
  abstract create(data: Omit<Image, 'id' | 'course'>): Promise<Image>;
  abstract remove(publicId: string): void;
  abstract findById(id: string): Promise<Image | null>;
  abstract getTotalSize(userId: string): Promise<NullableType<number>>;
}
