import { BadRequestException, Injectable } from '@nestjs/common'

//Domain
import { UserRepository } from './user.repository'
import { CreateUserClientDTO } from './dtos/user.client-dto'

//Others
import { EncryptService } from 'src/modules/common/services/encrypt.service'

@Injectable()
export class UserService {
  constructor(
    private readonly _encryptService: EncryptService,
    private readonly _userRepository: UserRepository,
  ) {}

  async findAll() {
    return await this._userRepository.findAll()
  }

  async findById(id: string) {
    return await this._userRepository.findById(id)
  }

  async findByEmail(email: string) {
    return await this._userRepository.findByEmail(email)
  }

  async create(payload: CreateUserClientDTO) {
    const hasUser = await this.findByEmail(payload.email)

    if (hasUser) {
      throw new BadRequestException('A user with this email already exists')
    }

    const hashedPassword = await this._encryptService.generateHash(
      payload.password,
    )

    const userData = {
      ...payload,
      password: hashedPassword,
    }

    const newUser = await this._userRepository.create(userData)

    return newUser
  }
}
