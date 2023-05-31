import { Todo } from '../todo.entity'
import {
  StandardCreateRepositoryDTO,
  StandardUpdateRepositoryDTO,
} from 'src/modules/common/types/dto.types'

export type CreateTodoRepositoryDTO = StandardCreateRepositoryDTO<Todo>

export type UpdateTodoRepositoryDTO = StandardUpdateRepositoryDTO<Todo>
