export type UploadVideoPayload = {
  video: Express.Multer.File;
  title: string;
  description: string;
};
