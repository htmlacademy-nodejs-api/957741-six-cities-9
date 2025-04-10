import { StatusCodes } from 'http-status-codes';
import { BaseUserException } from './index.js';

export class AccessDeniedError extends BaseUserException {
  constructor() {
    super(StatusCodes.FORBIDDEN, 'You have no access for the resource');
  }
}

