import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { getErrorMessage, getMongoURI } from '../../shared/helpers/index.js';
import { StringPrettifier } from '../helpers/string-prettifier.js';
import { validateImportCommandParams } from '../helpers/validators.js';

import { Offer } from '../../shared/types/offer.type.js';
import { Command } from './command.interface.js';
import { CommandName } from '../constants.js';
import { DatabaseClient, MongoDatabaseClient } from '../../shared/libs/database-client/index.js';
import { DefaultOfferService, OfferModel, OfferService } from '../../shared/modules/offer/index.js';
import { DefaultUserService, UserModel, UserService } from '../../shared/modules/user/index.js';
import { Logger, ConsoleLogger } from '../../shared/libs/logger/index.js';

export class ImportCommand implements Command {
  public getName(): CommandName {
    return CommandName.IMPORT;
  }

  private userService: UserService;
  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedOffer = this.onImportedOffer.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  private async onImportedOffer(offer: Offer, resolve: () => void) {
    await this.saveOffer(offer);
    resolve();
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate(
      offer.user,
      this.salt
    );

    await this.offerService.create({
      title: offer.title,
      description: offer.description,
      createdAt: offer.createdAt,
      city: offer.city,
      previewImage: offer.previewImage,
      images: offer.images,
      isPremium: offer.isPremium,
      rating: offer.rating,
      type: offer.type,
      rooms: offer.rooms,
      guests: offer.guests,
      price: offer.price,
      amenities: offer.amenities,
      authorId: user.id,
      commentsCount: offer.commentsCount,
      location: offer.location,
    });
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  public async execute(...parameters: string[]): Promise<void> {
    validateImportCommandParams(parameters);

    const [filename, login, password, host, dbname, dbport, salt] = parameters;
    this.salt = salt;
    const uri = getMongoURI(login, password, host, dbport, dbname);
    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedOffer);
    fileReader.on('end', this.onCompleteImport);

    try {
      fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(StringPrettifier.error(getErrorMessage(error)));
    }
  }
}
