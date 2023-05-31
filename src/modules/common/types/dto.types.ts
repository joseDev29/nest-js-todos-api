export type StandardCreateRepositoryDTO<T> = Omit<
  T,
  '_id' | 'createdAt' | 'updatedAt'
>

export type StandardUpdateRepositoryDTO<T> = Partial<
  StandardCreateRepositoryDTO<T>
>
