import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'

//Domain
import { TokenPayload } from '../../domain/auth-token-payload.interface'

//Application
import { ROLES_KEY } from '../decorators/roles.decorator'
import { Role } from 'src/modules/core/users/domain/user.roles'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: Role[] = this._reflector.get(
      ROLES_KEY,
      context.getHandler(),
    )

    if (!validRoles) return true

    const request = context.switchToHttp().getRequest()

    const user = request.user as TokenPayload

    const isValidRole = validRoles.includes(user.role as Role)

    if (!isValidRole) {
      throw new ForbiddenException()
    }

    return isValidRole
  }
}
