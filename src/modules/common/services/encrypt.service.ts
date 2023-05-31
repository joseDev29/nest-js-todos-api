import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class EncryptService {
  constructor() {}

  async generateHash(value: string) {
    const hashedValue = await bcrypt.hash(value, 10)
    return hashedValue
  }

  async validateHash(value: string, hash: string) {
    const isMatch = await bcrypt.compare(value, hash)
    return isMatch
  }
}
