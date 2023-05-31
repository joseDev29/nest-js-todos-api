import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'

//App Modules
import { CommonModule } from './modules/common/common.module'
import { MongoDbModule } from './modules/database/mongo-db/mongo-db.module'

//Core Modules
import { UsersModule } from './modules/core/users/users.module'
import { AuthModule } from './modules/core/auth/auth.module'

//Controllers
import { AppController } from './app.controller'

//Others
import config from './config/config'
import { environments } from './config/environments'
import { TodosModule } from './modules/core/todos/todos.module'

const ConfigModuleProvider = ConfigModule.forRoot({
  envFilePath: environments[process.env.NODE_ENV] || environments.development,
  isGlobal: true,
  load: [config],
  validationSchema: Joi.object({
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRATION_TIME: Joi.string().required(),
    MONGO_CONNECTION: Joi.string().required(),
    MONGO_USER: Joi.string().required(),
    MONGO_PASSWORD: Joi.string().required(),
    MONGO_HOST: Joi.string().required(),
    MONGO_DB_NAME: Joi.string().required(),
  }),
})

@Module({
  imports: [
    ConfigModuleProvider,
    CommonModule,
    MongoDbModule,
    UsersModule,
    AuthModule,
    TodosModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
