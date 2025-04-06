import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { BaseController, HttpMethod } from '../index.js';
import { Logger } from '../../logger/index.js';
import { COMPONENT_MAP } from '../../../types/component-map.enum.js';
import { OfferRdo, OfferService } from '../../../modules/offer/index.js';
import { fillDTO } from '../../../helpers/common.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(COMPONENT_MAP.LOGGER) protected readonly logger: Logger,
    @inject(COMPONENT_MAP.OFFER_SERVICE) private readonly offerService: OfferService,
    @inject(COMPONENT_MAP.COMMENT_SERVICE) private readonly commentService: CommentService
  ) {
    super(logger);

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Get, handler: this.show });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Patch, handler: this.update });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Delete, handler: this.delete });

    this.logger.info('Register routes for OfferController');
  }

  public async index(req: Request, res: Response): Promise<void> {
    const limit = parseInt(req.query.limit as string, 10);
    const offers = await this.offerService.find(limit);
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async create(req: Request, res: Response): Promise<void> {
    // 400 Ошибка валидации данных
    const offer = await this.offerService.create(req.body);
    const responseData = fillDTO(OfferRdo, offer);
    this.created(res, responseData);
  }

  public async show(req: Request, res: Response): Promise<void> {
    // 404	Предложение не найдено
    const offer = await this.offerService.findById(req.params.offerId);
    const responseData = fillDTO(OfferRdo, offer);
    this.ok(res, responseData);
  }

  public async update(req: Request, res: Response): Promise<void> {
    // 400 Ошибка валидации данных
    // 403 Попытка редактирования чужого предложения
    // 404 Предложение не найдено
    const offer = await this.offerService.updateById(req.params.offerId, req.body);
    const responseData = fillDTO(OfferRdo, offer);
    this.ok(res, responseData);
  }

  public async delete({ params }: Request, res: Response): Promise<void> {
    // 403 Попытка редактирования чужого предложения
    // 404 Предложение не найдено
    this.commentService.deleteByOfferId(params.offerId);
    const offer = await this.offerService.deleteById(params.offerId);
    const responseData = fillDTO(OfferRdo, offer);
    this.noContent(res, responseData);
  }
}
