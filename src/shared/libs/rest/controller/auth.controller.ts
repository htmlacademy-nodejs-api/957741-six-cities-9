import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController, HttpMethod } from '../index.js';
import { Logger } from '../../logger/index.js';
import { COMPONENT_MAP } from '../../../types/component-map.enum.js';
import { AuthService } from '../../../modules/auth/auth-service.interface.js';
import { fillDTO } from '../../../helpers/common.js';
import { AuthRdo } from '../../../modules/auth/index.js';

@injectable()
export class AuthController extends BaseController {
  constructor(
    @inject(COMPONENT_MAP.LOGGER) protected readonly logger: Logger,
    @inject(COMPONENT_MAP.AUTH_SERVICE) private readonly authService: AuthService,
  ) {
    super(logger);

    this.addRoute({ path: '/login', method: HttpMethod.Get, handler: this.login });
    this.addRoute({ path: '/status', method: HttpMethod.Post, handler: this.status });

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

  public async status(req: Request, res: Response): Promise<void> {
    // 200 Аутентификация успешна, токен выдан
    // 401 Неверный логин или пароль
  }

}
