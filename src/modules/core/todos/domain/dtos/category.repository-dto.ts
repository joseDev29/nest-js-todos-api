import { Category } from '../category.entity'
import {
  StandardCreateRepositoryDTO,
  StandardUpdateRepositoryDTO,
} from 'src/modules/common/types/dto.types'

export type CreateCategoryRepositoryDTO = StandardCreateRepositoryDTO<Category>

export type UpdateCategoryRepositoryDTO = StandardUpdateRepositoryDTO<Category>
