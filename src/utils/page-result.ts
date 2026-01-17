export type PaginationMetadata = {
  hasNextPage: boolean;
  count: number;
};

export type PageResult<T> = {
  list: T[];
  metadata: PaginationMetadata;
};
