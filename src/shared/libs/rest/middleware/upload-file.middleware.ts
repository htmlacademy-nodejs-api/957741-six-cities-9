import { NextFunction, Request, Response } from 'express';
import multer, { diskStorage } from 'multer';
import { extension } from 'mime-types';
import { randomUUID } from 'node:crypto';
import { Middleware } from './middleware.interface.js';
import { InvalidFileExtensionException } from '../errors/invalid-file-extension.exception.js';

export class UploadFileMiddleware implements Middleware {
  private readonly allowedExtensions: string[];

  constructor(
    private uploadDirectory: string,
    private fieldName: string,
    allowedExtensions: string[]
  ) {
    this.allowedExtensions = allowedExtensions;
  }

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const storage = diskStorage({
      destination: this.uploadDirectory,
      filename: (_req, file, callback) => {
        const fileExtention = extension(file.mimetype);
        if (!fileExtention || !this.allowedExtensions.includes(fileExtention)) {
          throw new InvalidFileExtensionException(fileExtention || '', this.allowedExtensions);
        }
        const filename = randomUUID();
        callback(null, `${filename}.${fileExtention}`);
      }
    });

    const uploadSingleFileMiddleware = multer({ storage }).single(this.fieldName);
    uploadSingleFileMiddleware(req, res, next);
  }
}
