import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../../../libs/rest/index.js';

export class UserAlreadyExistsException extends HttpError {
  constructor(email: string) {
    super(StatusCodes.CONFLICT, `User with email ${email} already exists`);
  }
}
