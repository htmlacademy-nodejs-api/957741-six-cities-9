import { inject, injectable } from 'inversify';

import { Config, RestSchema } from '../shared/libs/config/index.js';
import { Logger } from '../shared/libs/logger/index.js';
import { COMPONENT_MAP } from '../shared/types/index.js';
import { DatabaseClient } from '../shared/libs/database-client/index.js';
import { getMongoURI } from '../shared/helpers/index.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(COMPONENT_MAP.LOGGER) private readonly logger: Logger,
    @inject(COMPONENT_MAP.CONFIG) private readonly config: Config<RestSchema>,
    @inject(COMPONENT_MAP.DATABESE_CLIENT) private readonly databaseClient: DatabaseClient,
  ) {
    this.logger.info('RestApplication created…');
  }

  private async initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    return this.databaseClient.connect(mongoUri);
  }

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
    this.logger.info(`Get value from env $SALT: ${this.config.get('SALT')}`);
    this.logger.info(`Get value from env $DB_HOST: ${this.config.get('DB_HOST')}`);
    this.logger.info(`Get value from env $DB_PORT: ${this.config.get('DB_PORT')}`);
    this.logger.info(`Get value from env $DB_NAME: ${this.config.get('DB_NAME')}`);
    this.logger.info(`Get value from env $DB_USER: ${this.config.get('DB_USER')}`);
    this.logger.info(`Get value from env $DB_PASSWORD: ${this.config.get('DB_PASSWORD')}`);

    this.logger.info('Init database…');
    await this.initDb();

    this.logger.info('Init database completed');
  }
}
