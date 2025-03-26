import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';

import { Logger } from '../../libs/logger/index.js';
import { COMPONENT_MAP, SortType } from '../../types/index.js';

import { CommentEntity, CommentService, CreateCommentDto } from './index.js';
import { OfferService } from '../offer/index.js';
import { COMMENT_COUNT } from './conts.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(COMPONENT_MAP.LOGGER) private readonly logger: Logger,
    @inject(COMPONENT_MAP.OFFER_SERVICE) private readonly offerService: OfferService,
    @inject(COMPONENT_MAP.OFFER_MODEL) private readonly commentModel: types.ModelType<CommentEntity>
  ) { }

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    this.logger.info(`New comment created: ${comment._id}`);

    const { offerId, rating: newRating } = dto;
    await this.offerService.incCommentCountAndUpdateRating(offerId, newRating);

    return comment.populate('userId');
  }

  public async findByOfferId (offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({ offerId })
      .sort({ createdAt: SortType.Down })
      .limit(COMMENT_COUNT)
      .populate('userId');
  }
}
