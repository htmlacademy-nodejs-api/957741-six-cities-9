import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';

import { Logger } from '../../libs/logger/index.js';
import { COMPONENT_MAP, SortType } from '../../types/index.js';

import { CommentEntity, CommentService, CreateCommentDto } from './index.js';
import { OfferService } from '../offer/index.js';
import { COMMENT_COUNT } from './conts.js';
import { DeleteResult } from 'mongoose';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(COMPONENT_MAP.LOGGER) private readonly logger: Logger,
    @inject(COMPONENT_MAP.OFFER_SERVICE) private readonly offerService: OfferService,
    @inject(COMPONENT_MAP.COMMENT_MODEL) private readonly commentModel: types.ModelType<CommentEntity>
  ) { }

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    this.logger.info(`New comment created: ${comment._id}`);

    await this.offerService.incCommentCountAndUpdateRating(comment.offerId._id.toString(), comment.rating);

    return comment.populate('authorId');
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({ offerId })
      .sort({ createdAt: SortType.Down })
      .limit(COMMENT_COUNT)
      .populate('authorId').exec();
  }

  public async deleteByOfferId(offerId: string): Promise<DeleteResult> {
    return this.commentModel.deleteMany({ offerId }).exec();
  }
}
