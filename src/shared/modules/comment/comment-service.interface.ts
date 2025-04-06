import { DocumentType } from '@typegoose/typegoose';

import { CreateCommentDto } from './index.js';
import { CommentEntity } from './comment.entity.js';
import { DeleteResult } from 'mongoose';

export interface CommentService {
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]>;
  deleteByOfferId(offerId: string): Promise<DeleteResult>;
}
