import { Global, Module } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import {
  UserDocument,
  UserSchema,
} from 'src/modules/core/users/infrastructure/user-mongo-db.model'

import config from '../../../config/config'
import {
  CategoryDocument,
  CategorySchema,
} from 'src/modules/core/todos/infrastructure/category-mongo-db.model'
import {
  TodoDocument,
  TodoSchema,
} from 'src/modules/core/todos/infrastructure/todo-mongo-db.model'

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (_config: ConfigType<typeof config>) => {
        const credentials = _config.mongoDB

        return {
          uri: `${credentials.connection}://${credentials.host}`,
          user: credentials.user,
          pass: credentials.password,
          dbName: credentials.dbName,
        }
      },
      inject: [config.KEY],
    }),
    MongooseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
      { name: CategoryDocument.name, schema: CategorySchema },
      { name: TodoDocument.name, schema: TodoSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class MongoDbModule {}
