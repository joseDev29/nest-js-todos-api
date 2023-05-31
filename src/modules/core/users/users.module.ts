import { Module, Provider } from '@nestjs/common'

//Domain
import { UserRepository } from './domain/user.repository'
import { UserService } from './domain/user.service'

//Application
import { UsersController } from './application/users.controller'

//Infrastructure
import { UserMongoDbRepository } from './infrastructure/user-mongo-db.repository'

const UserRepositoryProvider: Provider = {
  provide: UserRepository,
  useClass: UserMongoDbRepository,
}

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UserRepositoryProvider, UserService],
  exports: [UserService],
})
export class UsersModule {}
