import { Role } from './user.roles'

export interface User {
  _id: string
  name: string
  email: string
  password: string
  role: Role
  createdAt: string
  updatedAt: string
}
