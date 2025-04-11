import { StatusCodes } from 'http-status-codes';
import { HttpError } from './index.js';

export class InvalidFileExtensionException extends HttpError {
  constructor(fileExtention: string, allowedExtensions: string[]) {
    super(StatusCodes.BAD_GATEWAY, `File "${fileExtention}" has an invalid extension. Allowed extensions: ${allowedExtensions.join(', ')}`);
  }
}
