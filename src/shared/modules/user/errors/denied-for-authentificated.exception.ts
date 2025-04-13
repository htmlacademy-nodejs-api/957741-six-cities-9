import { HttpError } from '../../../libs/rest/index.js';

export class DeniedForAuthentificatedException extends HttpError {
  constructor() {
    super(403, 'DeniedForAuthentificatedException');
  }
}
