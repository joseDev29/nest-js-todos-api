import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common'

import { JWTAuthGuard } from '../../auth/application/guards/jwt-auth.guard'
import { RolesGuard } from '../../auth/application/guards/roles.guard'
import { Roles } from '../../auth/application/decorators/roles.decorator'
import { Role } from '../../users/domain/user.roles'
import { Request } from 'express'
import { TokenPayload } from '../../auth/domain/auth-token-payload.interface'
import { TodoService } from '../domain/todo.service'
import {
  CreateTodoClientDTO,
  UpdateTodoClientDTO,
} from '../domain/dtos/todo.client-dto'

@UseGuards(JWTAuthGuard, RolesGuard)
@Controller('todos')
export class TodosController {
  constructor(private readonly _todoService: TodoService) {}

  @Get('me')
  @Roles(Role.STANDARD, Role.SUPER_ADMIN)
  async findMe(@Req() req: Request) {
    const tokenPayload = req.user as TokenPayload
    return {
      ok: true,
      data: await this._todoService.findAllByUserId(tokenPayload.id),
    }
  }

  @Post('me')
  @Roles(Role.STANDARD, Role.SUPER_ADMIN)
  async createMe(@Body() payload: CreateTodoClientDTO, @Req() req: Request) {
    const tokenPayload = req.user as TokenPayload
    const newTodo = await this._todoService.createByUser(
      tokenPayload.id,
      payload,
    )

    return {
      ok: true,
      data: newTodo,
    }
  }

  @Put('me/:id')
  @Roles(Role.STANDARD, Role.SUPER_ADMIN)
  async editMe(
    @Param('id') id: string,
    @Body() payload: UpdateTodoClientDTO,
    @Req() req: Request,
  ) {
    const tokenPayload = req.user as TokenPayload

    const updatedTodo = await this._todoService.editByUser(
      id,
      tokenPayload.id,
      payload,
    )

    return {
      ok: true,
      data: updatedTodo,
    }
  }

  @Delete('me/:id')
  @Roles(Role.STANDARD, Role.SUPER_ADMIN)
  async deleteMe(@Param('id') id: string, @Req() req: Request) {
    const tokenPayload = req.user as TokenPayload

    const deletedTodo = await this._todoService.deleteByUser(
      id,
      tokenPayload.id,
    )

    return {
      ok: true,
      data: deletedTodo,
    }
  }
}
