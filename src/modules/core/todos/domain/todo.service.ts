import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'

import { TodoRepository } from './todo.repository'
import {
  CreateTodoClientDTO,
  UpdateTodoClientDTO,
} from './dtos/todo.client-dto'

@Injectable()
export class TodoService {
  constructor(private readonly _todoRepository: TodoRepository) {}

  async findAllByUserId(userId: string) {
    return await this._todoRepository.findAllByUserId(userId)
  }

  async createByUser(userId: string, payload: CreateTodoClientDTO) {
    return await this._todoRepository.create({ ...payload, userId })
  }

  async editByUser(id: string, userId: string, payload: UpdateTodoClientDTO) {
    const foundedTodo = await this._todoRepository.findById(id)

    if (!foundedTodo) {
      throw new NotFoundException('Resource does not exist')
    }

    if (foundedTodo.userId !== userId) {
      throw new UnauthorizedException(
        'The resource does not belong to the user of the session',
      )
    }

    return await this._todoRepository.edit(id, payload)
  }

  async deleteByUser(id: string, userId: string) {
    const foundedTodo = await this._todoRepository.findById(id)

    if (!foundedTodo) {
      throw new NotFoundException('Resource does not exist')
    }

    if (foundedTodo.userId !== userId) {
      throw new UnauthorizedException(
        'The resource does not belong to the user of the session',
      )
    }

    return await this._todoRepository.delete(id)
  }
}
