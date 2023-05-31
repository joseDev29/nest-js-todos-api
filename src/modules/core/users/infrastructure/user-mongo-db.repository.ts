import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { isValidObjectId, Model } from 'mongoose'

//Domain
import { User } from '../domain/user.entity'
import { UserRepository } from '../domain/user.repository'
import { CreateUserRepositoryDTO } from '../domain/dtos/user.repository-dto'

//Infraestructure
import { UserDocument } from './user-mongo-db.model'

@Injectable()
export class UserMongoDbRepository implements UserRepository {
  constructor(
    @InjectModel(UserDocument.name)
    private readonly _userModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this._userModel.find().exec()
  }

  async findById(id: string): Promise<User> {
    if (!isValidObjectId(id)) {
      throw new Error("'id' is not valid ObjectId")
    }
    return await this._userModel.findById(id).exec()
  }

  async findByEmail(email: string): Promise<User> {
    return await this._userModel.findOne({ email }).exec()
  }

  async create(payload: CreateUserRepositoryDTO): Promise<User> {
    const newUser = new this._userModel(payload)
    return await newUser.save()
  }
}
