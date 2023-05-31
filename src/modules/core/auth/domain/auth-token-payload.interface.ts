import { Role } from '../../users/domain/user.roles'

export interface TokenPayload {
  id: string
  role: Role
}
