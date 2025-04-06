import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';

import { Logger } from '../../libs/logger/index.js';
import { OfferService, CreateOfferDto, OfferEntity, UpdateOfferDto } from './index.js';
import { City, COMPONENT_MAP } from '../../types/index.js';

import { Nullable, SortType } from '../../types/index.js';
import { OFFER_COUNT } from './const.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(COMPONENT_MAP.LOGGER) private readonly logger: Logger,
    @inject(COMPONENT_MAP.OFFER_MODEL) private readonly offerModel: types.ModelType<OfferEntity>,
  ) { }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string): Promise<Nullable<DocumentType<OfferEntity>>> {
    return this.offerModel
      .findById(offerId)
      .populate(['authorId'])
      .exec();
  }

  public async find(userLimit?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = userLimit ? Math.min(userLimit, OFFER_COUNT.MAX) : OFFER_COUNT.DEFAULT;

    return this.offerModel
      .find()
      .sort({ createdAt: SortType.Down })
      .limit(limit)
      .populate(['authorId'])
      .exec();
  }

  public async findPremium(city: City): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({ city, isPremium: true })
      .sort({ createdAt: SortType.Down })
      .limit(OFFER_COUNT.PREMIUM)
      .populate(['authorId'])
      .exec();
  }

  public async deleteById(offerId: string): Promise<Nullable<DocumentType<OfferEntity>>> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<Nullable<DocumentType<OfferEntity>>> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .populate(['authorId'])
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return this.offerModel
      .exists({ _id: documentId })
      .then(Boolean);
  }

  public async incCommentCountAndUpdateRating(offerId: string, newRating: number): Promise<Nullable<DocumentType<OfferEntity>>> {
    return this.offerModel
      .findByIdAndUpdate(
        offerId,
        [
          {
            $set: {
              commentsCount: { $add: ['$commentCount', 1] },
              ratingSum: { $add: ['$ratingSum', newRating] },
            }
          },
          {
            $set: {
              rating: { $divide: ['$ratingSum', '$commentCount'] }
            }
          }
        ],
        { new: true }
      )
      .exec();
  }
}
