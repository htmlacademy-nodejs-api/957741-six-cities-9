import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController, DocumentExistsMiddleware, HttpMethod, UploadFileMiddleware, ValidateDtoMiddleware, ValidateObjectIdMiddleware } from '../index.js';
import { Logger } from '../../logger/index.js';
import { COMPONENT_MAP } from '../../../types/component-map.enum.js';
import { CreateUserDto, UserRdo, UserService } from '../../../modules/user/index.js';
import { fillDTO } from '../../../helpers/index.js';
import { OfferRdo, OfferService } from '../../../modules/offer/index.js';
import { Config } from 'convict';
import { RestSchema } from '../../config/rest.schema.type.js';
import { PrivateRouteMiddleware } from '../middleware/private-route.middleware.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(COMPONENT_MAP.LOGGER) protected readonly logger: Logger,
    @inject(COMPONENT_MAP.USER_SERVICE) private readonly userService: UserService,
    @inject(COMPONENT_MAP.OFFER_SERVICE) private readonly offerService: OfferService,
    @inject(COMPONENT_MAP.CONFIG) private readonly config: Config<RestSchema>,
  ) {
    super(logger);

    this.addRoute({
      path: '/', method: HttpMethod.Post, handler: this.create,
      middlewares: [
        new ValidateDtoMiddleware(CreateUserDto)
      ]
    });
    this.addRoute({
      path: '/avatar', method: HttpMethod.Put, handler: this.uploadAvatar,
      middlewares: [
        new PrivateRouteMiddleware(),
        new UploadFileMiddleware(this.config.get('UPLOAD_DIRECTORY'), 'avatar'),
      ]
    });
    this.addRoute({
      path: '/favorites', method: HttpMethod.Get, handler: this.getFavorites,
      middlewares: [
        new PrivateRouteMiddleware(),
      ]
    });
    this.addRoute({
      path: '/favorites/:offerId', method: HttpMethod.Put, handler: this.putFavorites, middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/favorites/:offerId', method: HttpMethod.Delete, handler: this.deleteFavorites, middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });

    this.logger.info('Register routes for UserController');
  }

  public async create(req: Request, res: Response): Promise<void> {
    // 409	Пользователь с таким email уже существует.
    const user = await this.userService.create(req.body);
    this.created(res, fillDTO(UserRdo, user));
  }

  public async uploadAvatar(req: Request, res: Response) {
    // 400	Неверный формат файла. Допускаются только изображения в формате PNG или JPG.
    // 401	Не авторизован. Пожалуйста, предоставьте валидный токен.
    this.created(res, {
      filepath: req.file?.path
    });
  }

  public async getFavorites({ tokenPayload: { id: authorId } }: Request, res: Response): Promise<void> {
    const offers = this.userService.findFavorites(authorId);
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async putFavorites({ params: { offerId }, tokenPayload: { id: authorId } }: Request, res: Response): Promise<void> {
    const offer = this.userService.addToFavorites(authorId, offerId);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async deleteFavorites({ params: { offerId }, tokenPayload: { id: authorId } }: Request, res: Response): Promise<void> {
    const offer = this.userService.removeFromFavorites(authorId, offerId);
    this.ok(res, fillDTO(OfferRdo, offer));
  }
}
