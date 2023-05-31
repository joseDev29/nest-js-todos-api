import { Global, Module } from '@nestjs/common'

import { EncryptService } from './services/encrypt.service'

@Global()
@Module({
  providers: [EncryptService],
  exports: [EncryptService],
})
export class CommonModule {}
