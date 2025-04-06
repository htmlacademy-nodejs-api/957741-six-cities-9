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
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto)
      ]
    });
    this.addRoute({
      path: '/:offerId', method: HttpMethod.Delete, handler: this.delete, middlewares: [
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

  public async create({ body }: Request, res: Response): Promise<void> {
    const offer = await this.offerService.create(body);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async show({ params }: Request, res: Response): Promise<void> {
    const offer = await this.offerService.findById(params.offerId);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async update({ body, params }: Request, res: Response): Promise<void> {
    // 403 Попытка редактирования чужого предложения
    const offer = await this.offerService.updateById(params.offerId, body);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async delete({ params }: Request, res: Response): Promise<void> {
    // 403 Попытка редактирования чужого предложения
    this.commentService.deleteByOfferId(params.offerId);
    const offer = await this.offerService.deleteById(params.offerId);
    this.noContent(res, fillDTO(OfferRdo, offer));
  }

  public async findPremiumByCity({ params }: Request, res: Response): Promise<void> {
    const city = params.city as CityName;
    const cityName = city.toUpperCase() as keyof typeof CityName;

    if (!city || CityName[cityName]) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `Invalid city name: ${city}`,
        'OfferController'
      );
    }

    const offers = await this.offerService.findPremiumByCity(city);
    this.ok(res, fillDTO(OfferRdo, offers));
  }
}
