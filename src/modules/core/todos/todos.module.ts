import { Module, Provider } from '@nestjs/common'
import { TodoService } from './domain/todo.service'
import { CategoryService } from './domain/category.service'
import { CategoryMongoDbRepository } from './infrastructure/category-mongo-db.repository'
import { CategoryRepository } from './domain/category.repository'
import { TodoRepository } from './domain/todo.repository'
import { TodoMongoDbRepository } from './infrastructure/todo-mongo-db.repository'
import { CategoriesController } from './application/categories.controller'
import { TodosController } from './application/todos.controller'

const CategoryRepositoryProvider: Provider = {
  provide: CategoryRepository,
  useClass: CategoryMongoDbRepository,
}

const TodoRepositoryProvider: Provider = {
  provide: TodoRepository,
  useClass: TodoMongoDbRepository,
}

@Module({
  imports: [],
  controllers: [CategoriesController, TodosController],
  providers: [
    CategoryRepositoryProvider,
    CategoryService,
    TodoRepositoryProvider,
    TodoService,
  ],
  exports: [],
})
export class TodosModule {}
