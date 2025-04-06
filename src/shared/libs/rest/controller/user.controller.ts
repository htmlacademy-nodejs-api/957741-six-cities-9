import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController, DocumentExistsMiddleware, HttpMethod, UploadFileMiddleware, ValidateObjectIdMiddleware } from '../index.js';
import { Logger } from '../../logger/index.js';
import { COMPONENT_MAP } from '../../../types/component-map.enum.js';
import { UserRdo, UserService } from '../../../modules/user/index.js';
import { fillDTO } from '../../../helpers/index.js';
import { OfferService } from '../../../modules/offer/index.js';
import { Config } from 'convict';
import { RestSchema } from '../../config/rest.schema.type.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(COMPONENT_MAP.LOGGER) protected readonly logger: Logger,
    @inject(COMPONENT_MAP.USER_SERVICE) private readonly userService: UserService,
    @inject(COMPONENT_MAP.OFFER_SERVICE) private readonly offerService: OfferService,
    @inject(COMPONENT_MAP.CONFIG) private readonly config: Config<RestSchema>,
  ) {
    super(logger);

    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({
      path: '/avatar', method: HttpMethod.Put, handler: this.uploadAvatar,
      middlewares: [
        new UploadFileMiddleware(this.config.get('UPLOAD_DIRECTORY'), 'avatar'),
      ]
    });
    this.addRoute({ path: '/favorites', method: HttpMethod.Get, handler: this.getFavorites });
    this.addRoute({
      path: '/favorites/:offerId', method: HttpMethod.Put, handler: this.putFavorites, middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/favorites/:offerId', method: HttpMethod.Delete, handler: this.deleteFavorites, middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });

    this.logger.info('Register routes for UserController');
  }

  public async create(req: Request, res: Response): Promise<void> {
    // 400 Ошибка валидации данных
    // 409	Пользователь с таким email уже существует.
    const user = await this.userService.create(req.body);
    const responseData = fillDTO(UserRdo, user);
    this.created(res, responseData);
  }

  public async uploadAvatar(req: Request, res: Response) {
    // 200	Изображение аватара успешно загружено.
    // 400	Неверный формат файла. Допускаются только изображения в формате PNG или JPG.
    // 401	Не авторизован. Пожалуйста, предоставьте валидный токен.

    this.created(res, {
      filepath: req.file?.path
    });
  }

  public async getFavorites(req: Request, res: Response): Promise<void> {
    // 200 Список избранных предложений
  }

  public async putFavorites(req: Request, res: Response): Promise<void> {
    // 200 Предложение добавлено в избранное
    // 404 Предложение не найдено
  }

  public async deleteFavorites(req: Request, res: Response): Promise<void> {
    // 200	Предложение удалено из избранного
    // 404	Предложение не найдено
  }
}
