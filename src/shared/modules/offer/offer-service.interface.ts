import { DocumentType } from '@typegoose/typegoose';

import { CreateOfferDto, OfferEntity, UpdateOfferDto } from './index.js';

import { City, Nullable } from '../../types/index.js';
import { DocumentExists } from '../types.js';

export interface OfferService extends DocumentExists {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<Nullable<DocumentType<OfferEntity>>>;
  find(limit?: number): Promise<DocumentType<OfferEntity>[]>;
  findPremium(city: City): Promise<DocumentType<OfferEntity>[]>;
  deleteById(offerId: string): Promise<Nullable<DocumentType<OfferEntity>>>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<Nullable<DocumentType<OfferEntity>>>;
  incCommentCountAndUpdateRating(offerId: string, newRating: number): Promise<Nullable<DocumentType<OfferEntity>>>;
  exists(offerId: string): Promise<boolean>;
}
