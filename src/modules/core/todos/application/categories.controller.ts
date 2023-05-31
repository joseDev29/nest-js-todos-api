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

import { CategoryService } from '../domain/category.service'
import {
  CreateCategoryClientDTO,
  UpdateCategoryClientDTO,
} from '../domain/dtos/category.client-dto'

@UseGuards(JWTAuthGuard, RolesGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly _categoryService: CategoryService) {}

  @Get('me')
  @Roles(Role.STANDARD, Role.SUPER_ADMIN)
  async findMe(@Req() req: Request) {
    const tokenPayload = req.user as TokenPayload
    return {
      ok: true,
      data: await this._categoryService.findAllByUserId(tokenPayload.id),
    }
  }

  @Post('me')
  @Roles(Role.STANDARD, Role.SUPER_ADMIN)
  async createMe(
    @Body() payload: CreateCategoryClientDTO,
    @Req() req: Request,
  ) {
    const tokenPayload = req.user as TokenPayload
    const newCategory = await this._categoryService.createByUser(
      tokenPayload.id,
      payload,
    )

    return {
      ok: true,
      data: newCategory,
    }
  }

  @Put('me/:id')
  @Roles(Role.STANDARD, Role.SUPER_ADMIN)
  async editMe(
    @Param('id') id: string,
    @Body() payload: UpdateCategoryClientDTO,
    @Req() req: Request,
  ) {
    const tokenPayload = req.user as TokenPayload

    const updatedCategory = await this._categoryService.editByUser(
      id,
      tokenPayload.id,
      payload,
    )

    return {
      ok: true,
      data: updatedCategory,
    }
  }

  @Delete('me/:id')
  @Roles(Role.STANDARD, Role.SUPER_ADMIN)
  async deleteMe(@Param('id') id: string, @Req() req: Request) {
    const tokenPayload = req.user as TokenPayload

    const deletedCategory = await this._categoryService.deleteByUser(
      id,
      tokenPayload.id,
    )

    return {
      ok: true,
      data: deletedCategory,
    }
  }
}
