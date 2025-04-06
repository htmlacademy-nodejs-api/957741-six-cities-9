import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController, HttpMethod } from '../index.js';
import { Logger } from '../../logger/index.js';
import { COMPONENT_MAP } from '../../../types/component-map.enum.js';

@injectable()
export class AuthController extends BaseController {
  constructor(
    @inject(COMPONENT_MAP.LOGGER) protected readonly logger: Logger,
  ) {
    super(logger);

    this.addRoute({ path: '/login', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/status', method: HttpMethod.Post, handler: this.create });

    this.logger.info('Register routes for AuthController');
  }

  public async index(req: Request, res: Response): Promise<void> {
    // 200 Пользователь авторизован
    // 401 Пользователь не авторизован
  }

  public async create(req: Request, res: Response): Promise<void> {
    // 200 Аутентификация успешна, токен выдан
    // 401 Неверный логин или пароль
  }

}
