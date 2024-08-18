export type UploadVideoPayload = {
  file: Express.Multer.File;
  title: string;
  description: string;
};
