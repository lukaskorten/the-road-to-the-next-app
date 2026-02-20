export type PaginationMetadata = {
  hasNextPage: boolean;
  count: number;
  cursor?: { id: string; createdAt: Date };
};

export type Paginated<T> = {
  list: T[];
  metadata: PaginationMetadata;
};
