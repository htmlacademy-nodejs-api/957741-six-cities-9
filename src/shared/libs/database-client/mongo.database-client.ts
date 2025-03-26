import * as Mongoose from 'mongoose';
import { inject, injectable } from 'inversify';
import { setTimeout } from 'node:timers/promises';

import { DatabaseClient } from './database-client.interface.js';
import { Logger } from '../logger/index.js';
import { MONGO_SETUP } from './const.js';

import { COMPONENT_MAP } from '../../types/index.js';

@injectable()
export class MongoDatabaseClient implements DatabaseClient {
  private mongoose: typeof Mongoose;

  constructor(
    @inject(COMPONENT_MAP.LOGGER) private readonly logger: Logger
  ) { }

  public isConnected() {
    return this.mongoose?.connection?.readyState === MONGO_SETUP.CONNECTIONT_READY_STATE;
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnected()) {
      throw new Error('MongoDB client already connected');
    }

    this.logger.info('Trying to connect to MongoDB…');

    let attempt = 0;
    while (attempt < MONGO_SETUP.RETRY_COUNT) {
      try {
        this.mongoose = await Mongoose.connect(uri);
        this.logger.info('Database connection established.');
        return;
      } catch (error) {
        attempt++;
        this.logger.error(`Failed to connect to the database. Attempt ${attempt}`, error as Error);
        await setTimeout(MONGO_SETUP.RETRY_TIMEOUT);
      }
    }

    this.logger.info('Database connection established.');
    throw new Error(`Unable to establish database connection after ${MONGO_SETUP.RETRY_COUNT}`);
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected()) {
      throw new Error('Not connected to the database');
    }

    await this.mongoose.disconnect?.();
    this.logger.info('Database connection closed.');
  }
}
