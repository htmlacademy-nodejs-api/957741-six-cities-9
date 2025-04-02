import { inject, injectable } from 'inversify';
import { BaseController } from '../index.js';
import { Logger } from '../../logger/index.js';
import { COMPONENT_MAP } from '../../../types/component-map.enum.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(COMPONENT_MAP.LOGGER) protected readonly logger: Logger,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController');
  }
}
