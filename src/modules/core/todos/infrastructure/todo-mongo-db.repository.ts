import { Injectable } from '@nestjs/common'
import { TodoRepository } from '../domain/todo.repository'
import { InjectModel } from '@nestjs/mongoose'
import { TodoDocument } from './todo-mongo-db.model'
import { Model, isValidObjectId } from 'mongoose'
import { Todo } from '../domain/todo.entity'
import { CreateTodoRepositoryDTO } from '../domain/dtos/todo.repository-dto'
import { StandardCreateRepositoryDTO } from 'src/modules/common/types/dto.types'

@Injectable()
export class TodoMongoDbRepository implements TodoRepository {
  constructor(
    @InjectModel(TodoDocument.name)
    private readonly _todoModel: Model<TodoDocument>,
  ) {}

  async findById(id: string): Promise<Todo> {
    if (!isValidObjectId(id)) {
      throw new Error("'id' is not valid ObjectId")
    }
    return await this._todoModel.findById(id).exec()
  }

  async findAllByUserId(userId: string): Promise<Todo[]> {
    if (!isValidObjectId(userId)) {
      throw new Error("'userId' is not valid ObjectId")
    }
    return await this._todoModel
      .find()
      .where({ userId })
      .populate('categories')
      .exec()
  }

  async create(payload: CreateTodoRepositoryDTO): Promise<Todo> {
    const newTodo = new this._todoModel(payload)
    return await newTodo.save()
  }

  async edit(
    id: string,
    payload: Partial<StandardCreateRepositoryDTO<Todo>>,
  ): Promise<Todo> {
    return this._todoModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec()
  }

  async delete(id: string): Promise<Todo> {
    return await this._todoModel.findByIdAndDelete(id).exec()
  }
}
