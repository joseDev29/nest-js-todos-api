import { Category } from './category.entity'
import {
  CreateCategoryRepositoryDTO,
  UpdateCategoryRepositoryDTO,
} from './dtos/category.repository-dto'

export abstract class CategoryRepository {
  abstract findByUserId(userId: string): Promise<Category[]>

  abstract findById(id: string): Promise<Category>

  abstract create(payload: CreateCategoryRepositoryDTO): Promise<Category>

  abstract edit(
    id: string,
    payload: UpdateCategoryRepositoryDTO,
  ): Promise<Category>

  abstract delete(id: string): Promise<Category>
}
