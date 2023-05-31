import { Injectable } from '@nestjs/common'
import { CategoryRepository } from '../domain/category.repository'
import { InjectModel } from '@nestjs/mongoose'
import { CategoryDocument } from './category-mongo-db.model'
import { Model, isValidObjectId } from 'mongoose'
import { Category } from '../domain/category.entity'
import { StandardCreateRepositoryDTO } from 'src/modules/common/types/dto.types'
import { CreateCategoryRepositoryDTO } from '../domain/dtos/category.repository-dto'

@Injectable()
export class CategoryMongoDbRepository implements CategoryRepository {
  constructor(
    @InjectModel(CategoryDocument.name)
    private readonly _categoryModel: Model<CategoryDocument>,
  ) {}

  async findById(id: string): Promise<Category> {
    if (!isValidObjectId(id)) {
      throw new Error("'id' is not valid ObjectId")
    }
    return await this._categoryModel.findById(id).exec()
  }

  async findByUserId(userId: string): Promise<Category[]> {
    if (!isValidObjectId(userId)) {
      throw new Error("'userId' is not valid ObjectId")
    }

    return await this._categoryModel.find().where({ userId }).exec()
  }

  async create(payload: CreateCategoryRepositoryDTO): Promise<Category> {
    const newCategory = new this._categoryModel(payload)
    return await newCategory.save()
  }

  async edit(
    id: string,
    payload: Partial<StandardCreateRepositoryDTO<Category>>,
  ): Promise<Category> {
    return this._categoryModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec()
  }

  async delete(id: string): Promise<Category> {
    return await this._categoryModel.findByIdAndDelete(id).exec()
  }
}
