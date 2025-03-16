import * as Mongoose from 'mongoose';
import { inject, injectable } from 'inversify';

import { DatabaseClient } from './database-client.interface.js';
import { Logger } from '../logger/index.js';
import { CONNECTIONT_READY_STATE } from './const.js';

import { COMPONENT_MAP } from '../../types/index.js';

@injectable()
export class MongoDatabaseClient implements DatabaseClient {
  private mongoose: typeof Mongoose;

  constructor(
    @inject(COMPONENT_MAP.LOGGER) private readonly logger: Logger
  ) { }

  public isConnectedToDatabase() {
    return this.mongoose?.connection?.readyState === CONNECTIONT_READY_STATE;
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnectedToDatabase()) {
      throw new Error('MongoDB client already connected');
    }

    this.logger.info('Trying to connect to MongoDB…');

    this.mongoose = await Mongoose.connect(uri);

    this.logger.info('Database connection established.');
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnectedToDatabase()) {
      throw new Error('Not connected to the database');
    }

    await this.mongoose.disconnect?.();
    this.logger.info('Database connection closed.');
  }
}
