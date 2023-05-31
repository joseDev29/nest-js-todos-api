import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

import { Category } from '../domain/category.entity'
import { UserDocument } from '../../users/infrastructure/user-mongo-db.model'

@Schema({
  collection: 'categories',
  timestamps: true,
})
export class CategoryDocument
  extends Document
  implements Omit<Category, '_id'>
{
  @Prop({ required: true })
  name: string

  @Prop({ type: Types.ObjectId, ref: UserDocument.name, required: true })
  userId: string

  createdAt: string

  updatedAt: string
}

export const CategorySchema = SchemaFactory.createForClass(CategoryDocument)
