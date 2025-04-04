import { DocumentType, mongoose, types } from '@typegoose/typegoose';
import { injectable, inject } from 'inversify';

import { UserService } from './user-service.interface.js';
import { UserEntity } from './user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { COMPONENT_MAP } from '../../types/component-map.enum.js';
import { Logger } from '../../libs/logger/index.js';

import { Nullable } from '../../types/index.js';
import { UpdateUserDto } from './index.js';
import { OfferEntity } from '../offer/index.js';
import { Config, RestSchema } from '../../libs/config/index.js';

@injectable()
export class DefaultUserService implements UserService {
  constructor(
    @inject(COMPONENT_MAP.LOGGER) private readonly logger: Logger,
    @inject(COMPONENT_MAP.CONFIG) private readonly config: Config<RestSchema>,
    @inject(COMPONENT_MAP.USER_MODEL) private readonly userModel: types.ModelType<UserEntity>
  ) { }

  public async create(dto: CreateUserDto): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto, this.config.get('SALT'));

    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  public async findByEmail(email: string): Promise<Nullable<DocumentType<UserEntity>>> {
    return this.userModel.findOne({ email });
  }

  public async findById(userId: string): Promise<Nullable<DocumentType<UserEntity>>> {
    return this.userModel.findById(userId);
  }

  public async findOrCreate(dto: CreateUserDto): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto);
  }

  public async exists(userId: string): Promise<boolean> {
    return this.userModel
      .exists({ _id: userId })
      .then(Boolean);
  }

  public async updateById(userId: string, dto: UpdateUserDto): Promise<Nullable<DocumentType<UserEntity>>> {
    return this.userModel
      .findByIdAndUpdate(userId, dto, { new: true })
      .exec();
  }

  public async addToFavorites(userId: string, offerId: string): Promise<Nullable<DocumentType<UserEntity>>> {
    return this.userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: new mongoose.Types.ObjectId(offerId) } },
      { new: true }
    ).exec();
  }

  public async removeFromFavorites(userId: string, offerId: string): Promise<Nullable<DocumentType<UserEntity>>> {
    return this.userModel.findByIdAndUpdate(
      userId,
      { $pull: { favorites: new mongoose.Types.ObjectId(offerId) } },
      { new: true }
    ).exec();
  }

  public async findFavorites(userId: string): Promise<DocumentType<OfferEntity>[]> {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new Error('User not found');
    }

    if (!user.favorites || !user.favorites.length) {
      return [];
    }

    return this.userModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId)
        }
      },
      {
        $lookup: {
          from: 'offers',
          localField: 'favorites',
          foreignField: '_id',
          as: 'favoriteOffers',
        },
      },
      {
        $project: {
          favoriteOffers: 1,
        },
      },
    ]).exec();
  }
}
