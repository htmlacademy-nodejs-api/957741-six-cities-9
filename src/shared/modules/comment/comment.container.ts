import { ContainerModule } from 'inversify';
import { types } from '@typegoose/typegoose';

import { COMPONENT_MAP } from '../../types/index.js';
import { CommentService, CommentEntity, CommentModel, DefaultCommentService } from './index.js';

export function createCommentContainer() {
  return new ContainerModule(({ bind }) => {
    bind<CommentService>(COMPONENT_MAP.COMMENT_SERVICE).to(DefaultCommentService).inSingletonScope();
    bind<types.ModelType<CommentEntity>>(COMPONENT_MAP.COMMENT_MODEL).toConstantValue(CommentModel);
  });
}
