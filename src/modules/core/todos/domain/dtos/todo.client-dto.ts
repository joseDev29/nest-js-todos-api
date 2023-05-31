import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'

import { Todo } from '../todo.entity'
import { PartialType } from '@nestjs/mapped-types'

export class CreateTodoClientDTO
  implements Omit<Todo, '_id' | 'createdAt' | 'updatedAt' | 'userId'>
{
  @IsString()
  @IsNotEmpty()
  readonly title: string

  @IsString()
  @IsOptional()
  readonly description?: string

  @IsBoolean()
  @IsOptional()
  readonly isCompleted: boolean

  @IsArray()
  @IsOptional()
  readonly categories: string[]
}

export class UpdateTodoClientDTO extends PartialType(CreateTodoClientDTO) {}
