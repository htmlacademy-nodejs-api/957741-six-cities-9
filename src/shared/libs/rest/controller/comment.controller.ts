import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController, DocumentExistsMiddleware, HttpMethod, ValidateDtoMiddleware, ValidateObjectIdMiddleware } from '../index.js';
import { Logger } from '../../logger/index.js';
import { COMPONENT_MAP } from '../../../types/component-map.enum.js';
import { CommentRdo, CommentService, CreateCommentDto } from '../../../modules/comment/index.js';
import { fillDTO } from '../../../helpers/common.js';
import { OfferRdo, OfferService } from '../../../modules/offer/index.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(COMPONENT_MAP.LOGGER) protected readonly logger: Logger,
    @inject(COMPONENT_MAP.COMMENT_SERVICE) private readonly commentService: CommentService,
    @inject(COMPONENT_MAP.OFFER_CONTROLLER) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.addRoute({
      path: '/offers/:offerId', method: HttpMethod.Get, handler: this.index, middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/offers/:offerId', method: HttpMethod.Post, handler: this.create, middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new ValidateDtoMiddleware(CreateCommentDto)
      ]
    });

    this.logger.info('Register routes for CommentController');
  }

  public async index({ params }: Request, res: Response): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }

  public async create({ body, params }: Request, res: Response): Promise<void> {
    // 400 Ошибка валидации данных
    body.offerId = params.offerId;
    const comment = await this.commentService.create(body);
    await this.offerService.incCommentCountAndUpdateRating(body.offerId, body.rating);
    this.created(res, fillDTO(OfferRdo, comment));
  }

}
