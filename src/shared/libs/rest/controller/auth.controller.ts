import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController, HttpMethod } from '../index.js';
import { Logger } from '../../logger/index.js';
import { COMPONENT_MAP } from '../../../types/component-map.enum.js';
import { AuthService } from '../../../modules/auth/auth-service.interface.js';
import { fillDTO } from '../../../helpers/common.js';
import { AuthRdo } from '../../../modules/auth/index.js';
import { PrivateRouteMiddleware } from '../middleware/private-route.middleware.js';
import { UserRdo } from '../../../modules/user/index.js';

@injectable()
export class AuthController extends BaseController {
  constructor(
    @inject(COMPONENT_MAP.LOGGER) protected readonly logger: Logger,
    @inject(COMPONENT_MAP.AUTH_SERVICE) private readonly authService: AuthService,
  ) {
    super(logger);

    this.addRoute({ path: '/login', method: HttpMethod.Post, handler: this.login });
    this.addRoute({
      path: '/status', method: HttpMethod.Get, handler: this.status,
      middlewares: [
        new PrivateRouteMiddleware(),
      ]
    });

    this.logger.info('Register routes for AuthController');
  }

  public async login({ body }: Request, res: Response): Promise<void> {
    const user = await this.authService.login(body);
    const token = await this.authService.authenticate(user);
    const responseData = fillDTO(AuthRdo, {
      email: user.email,
      token,
    });
    this.ok(res, responseData);
  }

  public async status({ tokenPayload: { id } }: Request, res: Response): Promise<void> {
    const foundUser = await this.authService.status(id);
    this.ok(res, fillDTO(UserRdo, foundUser));
  }

}
