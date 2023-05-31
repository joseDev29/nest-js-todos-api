import { PartialType } from '@nestjs/mapped-types'
import { IsNotEmpty, IsString } from 'class-validator'

import { Category } from '../category.entity'

export class CreateCategoryClientDTO
  implements Omit<Category, '_id' | 'createdAt' | 'updatedAt' | 'userId'>
{
  @IsString()
  @IsNotEmpty()
  readonly name: string
}

export class UpdateCategoryClientDTO extends PartialType(
  CreateCategoryClientDTO,
) {}
