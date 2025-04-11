import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { BaseController, DocumentExistsMiddleware, HttpError, HttpMethod, ValidateDtoMiddleware, ValidateObjectIdMiddleware } from '../index.js';
import { Logger } from '../../logger/index.js';
import { COMPONENT_MAP } from '../../../types/component-map.enum.js';
import { CreateOfferDto, OfferRdo, OfferService, UpdateOfferDto } from '../../../modules/offer/index.js';
import { fillDTO } from '../../../helpers/common.js';
import { CommentService } from '../../../modules/comment/index.js';
import { CityName } from '../../../types/offer.type.js';
import { StatusCodes } from 'http-status-codes';
import { PrivateRouteMiddleware } from '../middleware/private-route.middleware.js';
import { AccessDeniedError } from '../../../modules/auth/errors/index.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(COMPONENT_MAP.LOGGER) protected readonly logger: Logger,
    @inject(COMPONENT_MAP.OFFER_SERVICE) private readonly offerService: OfferService,
    @inject(COMPONENT_MAP.COMMENT_SERVICE) private readonly commentService: CommentService
  ) {
    super(logger);

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/', method: HttpMethod.Post, handler: this.create, middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ]
    });
    this.addRoute({
      path: '/:offerId', method: HttpMethod.Get, handler: this.show, middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId', method: HttpMethod.Patch, handler: this.update, middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto)
      ]
    });
    this.addRoute({
      path: '/:offerId', method: HttpMethod.Delete, handler: this.delete, middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({ path: '/premium/:city', method: HttpMethod.Get, handler: this.findPremiumByCity });

    this.logger.info('Register routes for OfferController');
  }

  public async index({ query }: Request, res: Response): Promise<void> {
    const limit = parseInt(query.limit as string, 10);
    const offers = await this.offerService.find(limit);
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async create({ body, tokenPayload: { id: authorId } }: Request, res: Response): Promise<void> {
    body.authorId = authorId;
    const offer = await this.offerService.create(body);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async show({ params: { offerId } }: Request, res: Response): Promise<void> {
    const offer = await this.offerService.findById(offerId);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async update({ body, params: { offerId }, tokenPayload: { id: authorId } }: Request, res: Response): Promise<void> {
    const offer = await this.offerService.findById(offerId);
    if (offer?.authorId._id.toString() !== authorId) {
      throw new AccessDeniedError();
    }
    const updatedOffer = await this.offerService.updateById(offerId, body);
    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async delete({ params: { offerId }, tokenPayload: { id: authorId } }: Request, res: Response): Promise<void> {
    const offer = await this.offerService.findById(offerId);
    if (offer?.authorId._id.toString() !== authorId) {
      throw new AccessDeniedError();
    }
    this.commentService.deleteByOfferId(offerId);
    const deletedOffer = await this.offerService.deleteById(offerId);
    this.noContent(res, fillDTO(OfferRdo, deletedOffer));
  }

  public async findPremiumByCity({ params }: Request, res: Response): Promise<void> {
    const cityParam = params.city as string;
    const city = cityParam.charAt(0).toUpperCase() + cityParam.slice(1).toLowerCase() as CityName;

    if (!cityParam || !Object.values(CityName).includes(city)) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `Invalid city name: ${cityParam}`,
        'OfferController'
      );
    }

    const offers = await this.offerService.findPremiumByCity(city);
    this.ok(res, fillDTO(OfferRdo, offers));
  }
}
