import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'

import { CategoryRepository } from './category.repository'
import {
  CreateCategoryClientDTO,
  UpdateCategoryClientDTO,
} from './dtos/category.client-dto'

@Injectable()
export class CategoryService {
  constructor(private readonly _categoryRepository: CategoryRepository) {}

  async findAllByUserId(userId: string) {
    return await this._categoryRepository.findByUserId(userId)
  }

  async createByUser(userId: string, payload: CreateCategoryClientDTO) {
    return this._categoryRepository.create({ ...payload, userId })
  }

  async editByUser(
    id: string,
    userId: string,
    payload: UpdateCategoryClientDTO,
  ) {
    const foundedCategory = await this._categoryRepository.findById(id)

    if (!foundedCategory) {
      throw new NotFoundException('Resource does not exist')
    }

    if (foundedCategory.userId !== userId) {
      throw new UnauthorizedException(
        'The resource does not belong to the user of the session',
      )
    }

    return this._categoryRepository.edit(id, payload)
  }

  async deleteByUser(id: string, userId: string) {
    const foundedCategory = await this._categoryRepository.findById(id)

    if (!foundedCategory) {
      throw new NotFoundException('Resource does not exist')
    }

    if (foundedCategory.userId !== userId) {
      throw new UnauthorizedException(
        'The resource does not belong to the user of the session',
      )
    }

    return this._categoryRepository.delete(id)
  }
}
