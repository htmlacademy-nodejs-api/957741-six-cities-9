import { DocumentType } from '@typegoose/typegoose';

import { CreateOfferDto, OfferEntity } from './index.js';

import { Nullable } from '../../types/help.type.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<Nullable<DocumentType<OfferEntity>>>;
}
