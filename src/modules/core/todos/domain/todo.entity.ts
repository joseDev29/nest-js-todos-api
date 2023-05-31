import { Category } from './category.entity'

export interface Todo {
  _id: string
  title: string
  description?: string
  isCompleted: boolean
  categories: string[] | Category[]
  userId: string
  createdAt: string
  updatedAt: string
}
