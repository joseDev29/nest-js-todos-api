import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

import { Todo } from '../domain/todo.entity'
import { Category } from '../domain/category.entity'

import { CategoryDocument } from './category-mongo-db.model'
import { UserDocument } from '../../users/infrastructure/user-mongo-db.model'

@Schema({
  collection: 'todos',
  timestamps: true,
})
export class TodoDocument extends Document implements Omit<Todo, '_id'> {
  @Prop({ required: true })
  title: string

  @Prop()
  description?: string

  @Prop({ default: false })
  isCompleted: boolean

  @Prop({ type: [{ type: Types.ObjectId, ref: CategoryDocument.name }] })
  categories: string[] | Category[]

  @Prop({ type: Types.ObjectId, ref: UserDocument.name, required: true })
  userId: string

  createdAt: string

  updatedAt: string
}

export const TodoSchema = SchemaFactory.createForClass(TodoDocument)
