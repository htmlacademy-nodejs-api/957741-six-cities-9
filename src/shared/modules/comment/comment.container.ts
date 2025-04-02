import { ContainerModule } from 'inversify';
import { types } from '@typegoose/typegoose';

import { COMPONENT_MAP } from '../../types/index.js';
import { CommentService, CommentEntity, CommentModel, DefaultCommentService } from './index.js';
import { CommentController, Controller } from '../../libs/rest/index.js';

export function createCommentContainer() {
  return new ContainerModule(({ bind }) => {
    bind<CommentService>(COMPONENT_MAP.COMMENT_SERVICE).to(DefaultCommentService).inSingletonScope();
    bind<types.ModelType<CommentEntity>>(COMPONENT_MAP.COMMENT_MODEL).toConstantValue(CommentModel);
    bind<Controller>(COMPONENT_MAP.COMMENT_CONTROLLER).to(CommentController).inSingletonScope();
  });
}
