import { Todo } from './todo.entity'
import {
  CreateTodoRepositoryDTO,
  UpdateTodoRepositoryDTO,
} from './dtos/todo.repository-dto'

export abstract class TodoRepository {
  abstract findAllByUserId(userId: string): Promise<Todo[]>

  abstract findById(id: string): Promise<Todo>

  abstract create(payload: CreateTodoRepositoryDTO): Promise<Todo>

  abstract edit(id: string, payload: UpdateTodoRepositoryDTO): Promise<Todo>

  abstract delete(id: string): Promise<Todo>
}
