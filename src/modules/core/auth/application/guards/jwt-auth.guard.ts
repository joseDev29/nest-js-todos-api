import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'

import { IS_PUBLIC_KEY } from '../decorators/public.decorator'

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly _reflector: Reflector) {
    super()
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this._reflector.get(IS_PUBLIC_KEY, context.getHandler())

    if (isPublic) return true

    return super.canActivate(context)
  }
}
