import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

//Domain
import { User } from '../../users/domain/user.entity'
import { Role } from '../../users/domain/user.roles'
import { UserService } from '../../users/domain/user.service'
import { TokenPayload } from './auth-token-payload.interface'
import { RegisterUserDTO } from './register-user.dto'

//Others
import { EncryptService } from 'src/modules/common/services/encrypt.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _encryptService: EncryptService,
    private readonly _userService: UserService,
  ) {}

  async validateUser(email: string, password: string) {
    const foundedUser = await this._userService.findByEmail(email)

    if (!foundedUser) return null

    const isPasswordMatch = await this._encryptService.validateHash(
      password,
      foundedUser.password,
    )

    if (isPasswordMatch) return foundedUser

    return null
  }

  generateJWT(user: User) {
    const payload: TokenPayload = {
      id: user._id,
      role: user.role,
    }

    return this._jwtService.sign(payload)
  }

  async register(payload: RegisterUserDTO) {
    const newUser = await this._userService.create({
      ...payload,
      role: Role.STANDARD,
    })

    const accessToken = this.generateJWT(newUser)

    return {
      accessToken,
      user: newUser,
    }
  }
}
