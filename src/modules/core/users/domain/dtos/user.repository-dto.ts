import { User } from '../user.entity'
import {
  StandardCreateRepositoryDTO,
  StandardUpdateRepositoryDTO,
} from 'src/modules/common/types/dto.types'

export type CreateUserRepositoryDTO = StandardCreateRepositoryDTO<User>

export type UpdateUserRepositoryDTO = StandardUpdateRepositoryDTO<User>
