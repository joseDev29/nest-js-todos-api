import { User } from './user.entity'

import { CreateUserRepositoryDTO } from './dtos/user.repository-dto'

export abstract class UserRepository {
  abstract findAll(): Promise<User[]>

  abstract findById(id: string): Promise<User>

  abstract findByEmail(email: string): Promise<User>

  abstract create(payload: CreateUserRepositoryDTO): Promise<User>
}
