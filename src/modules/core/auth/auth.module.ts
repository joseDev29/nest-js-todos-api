import { Module } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

//Modules
import { UsersModule } from '../users/users.module'

//Domain
import { AuthService } from './domain/auth.service'

//Application
import { AuthController } from './application/auth.controller'
import { LocalStrategy } from './application/strategies/local.strategy'
import { JWTStrategy } from './application/strategies/jwt.strategy'

//Others
import config from 'src/config/config'

@Module({
  providers: [LocalStrategy, JWTStrategy, AuthService],
  imports: [
    PassportModule,

    JwtModule.registerAsync({
      useFactory: (_configService: ConfigType<typeof config>) => {
        const variables = _configService.auth.jwt

        return {
          secret: variables.secret,
          signOptions: {
            expiresIn: variables.expirationTime,
          },
        }
      },
      inject: [config.KEY],
    }),

    UsersModule,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
