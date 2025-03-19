import { ContainerModule } from 'inversify';
import { types } from '@typegoose/typegoose';

import { COMPONENT_MAP } from '../../types/index.js';
import { OfferModel, OfferService, DefaultOfferService, OfferEntity } from './index.js';

export function createOfferContainer() {
  return new ContainerModule(({ bind }) => {
    bind<OfferService>(COMPONENT_MAP.OFFER_SERVICE).to(DefaultOfferService).inSingletonScope();
    bind<types.ModelType<OfferEntity>>(COMPONENT_MAP.OFFER_MODEL).toConstantValue(OfferModel);
  });
}
