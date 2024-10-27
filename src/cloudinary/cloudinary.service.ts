import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { ImageRepository } from './persistence/image.repository';
import { Image } from './domain/image';

@Injectable()
export class CloudinaryService {
  constructor(private readonly imageRepository: ImageRepository) {}
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        if (result) {
          console.log({ result });
          resolve(result);
        }
      });
      toStream(file.buffer).pipe(upload);
    });
  }
  createImage(data: Omit<Image, 'id' | 'course'>) {
    return this.imageRepository.create(data);
  }
  async removeImage(id: string) {
    const image = await this.imageRepository.findById(id);
    if (!image) {
      throw new Error('Not found');
    }
    await v2.uploader.destroy(image.publicId);
    return this.imageRepository.remove(image.id);
  }
}
