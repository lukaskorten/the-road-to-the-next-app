export type PaginationMetadata = {
  hasNextPage: boolean;
  count: number;
};

export type Paginated<T> = {
  list: T[];
  metadata: PaginationMetadata;
};
