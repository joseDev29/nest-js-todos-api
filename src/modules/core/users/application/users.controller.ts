import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { Request } from 'express'

import { Role } from '../domain/user.roles'
import { UserService } from '../domain/user.service'
import { CreateUserClientDTO } from '../domain/dtos/user.client-dto'
import { TokenPayload } from '../../auth/domain/auth-token-payload.interface'

import { JWTAuthGuard } from '../../auth/application/guards/jwt-auth.guard'
import { RolesGuard } from '../../auth/application/guards/roles.guard'
import { Roles } from '../../auth/application/decorators/roles.decorator'

@UseGuards(JWTAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly _userService: UserService) {}

  @Get()
  @Roles(Role.SUPER_ADMIN)
  async findAll() {
    const data = await this._userService.findAll()

    return {
      ok: true,
      data,
    }
  }

  @Get('me')
  @Roles(Role.STANDARD, Role.SUPER_ADMIN)
  async findMe(@Req() req: Request) {
    const tokenPayload = req.user as TokenPayload

    const user = await this._userService.findById(tokenPayload.id)

    if (!user) {
      throw new NotFoundException('user not found')
    }

    return {
      ok: true,
      data: user,
    }
  }

  @Get(':id')
  @Roles(Role.SUPER_ADMIN)
  async findById(@Param('id') id: string) {
    const foundedUser = await this._userService.findById(id)

    if (!foundedUser) {
      throw new NotFoundException(`Product with id '${id}' not found`)
    }

    return {
      ok: true,
      data: foundedUser,
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.SUPER_ADMIN)
  async create(@Body() payload: CreateUserClientDTO) {
    const newUser = await this._userService.create(payload)

    return {
      ok: true,
      data: newUser,
    }
  }
}
