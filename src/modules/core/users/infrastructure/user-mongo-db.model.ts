import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { User } from '../domain/user.entity'
import { Role } from '../domain/user.roles'

@Schema({
  collection: 'users',
  timestamps: true,
})
export class UserDocument extends Document implements Omit<User, '_id'> {
  @Prop({
    required: true,
  })
  name: string

  @Prop({
    required: true,
    unique: true,
  })
  email: string

  @Prop({
    required: true,
    minlength: 8,
  })
  password: string

  @Prop({
    required: true,
  })
  role: Role

  createdAt: string

  updatedAt: string
}

export const UserSchema = SchemaFactory.createForClass(UserDocument)

UserSchema.methods.toJSON = function () {
  const user = this.toObject()
  delete user.password
  delete user.__v
  return user
}
