import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController, HttpMethod } from '../index.js';
import { Logger } from '../../logger/index.js';
import { COMPONENT_MAP } from '../../../types/component-map.enum.js';
import { CommentRdo, CommentService } from '../../../modules/comment/index.js';
import { fillDTO } from '../../../helpers/common.js';
import { OfferRdo } from '../../../modules/offer/index.js';

@injectable()
export class AuthController extends BaseController {
  constructor(
    @inject(COMPONENT_MAP.LOGGER) protected readonly logger: Logger,
    @inject(COMPONENT_MAP.COMMENT_SERVICE) private readonly commentService: CommentService,
  ) {
    super(logger);

    this.addRoute({ path: '/offers/:offerId', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/offers/:offerId', method: HttpMethod.Post, handler: this.create });

    this.logger.info('Register routes for CommentController');
  }

  public async index(req: Request, res: Response): Promise<void> {
    const comments = await this.commentService.findByOfferId(req.params.offerId);
    const responseData = fillDTO(CommentRdo, comments);
    this.ok(res, responseData);
  }

  public async create(req: Request, res: Response): Promise<void> {
    // 400 Ошибка валидации данных
    req.body.offerId = req.params.offerId;
    const comment = await this.commentService.create(req.body);
    const responseData = fillDTO(OfferRdo, comment);
    this.created(res, responseData);
  }

}
