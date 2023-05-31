import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'

//Domain
import { User } from '../../users/domain/user.entity'
import { AuthService } from '../domain/auth.service'
import { RegisterUserDTO } from '../domain/register-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request) {
    const user = req.user as User

    const accessToken = this._authService.generateJWT(user)

    return {
      ok: true,
      data: {
        accessToken,
        user,
      },
    }
  }

  @Post('register')
  async register(@Body() payload: RegisterUserDTO) {
    return {
      ok: true,
      data: await this._authService.register(payload),
    }
  }
}
