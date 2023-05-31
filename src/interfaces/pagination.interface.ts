export interface PaginationProps {
  readonly page: number
  readonly pageSize: number
}

export interface PaginationMetaData extends PaginationProps {
  readonly totalCount: number
  readonly totalPages: number
}
