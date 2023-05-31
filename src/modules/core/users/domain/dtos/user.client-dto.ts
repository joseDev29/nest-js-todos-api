import { PartialType } from '@nestjs/mapped-types'
import { IsString, IsEmail, IsNotEmpty, Length, IsEnum } from 'class-validator'

import { User } from '../user.entity'
import { Role } from '../user.roles'

export class CreateUserClientDTO
  implements Omit<User, '_id' | 'createdAt' | 'updatedAt'>
{
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsString()
  @IsEmail()
  readonly email: string

  @IsString()
  @IsNotEmpty()
  @Length(6, 100)
  readonly password: string

  @IsEnum(Role, {
    message: 'user.role no valid',
  })
  @IsNotEmpty()
  readonly role: Role
}

export class UpdateUserClientDTO extends PartialType(CreateUserClientDTO) {}
