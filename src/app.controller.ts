import { Controller, Get, Inject } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'

import config from './config/config'
import { environments } from './config/environments'

@Controller()
export class AppController {
  constructor(
    @Inject(config.KEY) private readonly _config: ConfigType<typeof config>,
  ) {}

  // @Get('config')
  // getConfig() {
  //   return this._config
  // }
}
