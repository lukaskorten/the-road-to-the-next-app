import {
  createSearchParamsCache,
  inferParserType,
  parseAsInteger,
  parseAsString,
} from 'nuqs/server';

export const searchParser = parseAsString
  .withDefault('')
  .withOptions({ shallow: false, clearOnDefault: true });

export const sortParser = {
  sortKey: parseAsString.withDefault('createdAt'),
  sortValue: parseAsString.withDefault('desc'),
};

export const sortOptions = {
  shallow: false,
  clearOnDefault: true,
};

export const paginationParser = {
  page: parseAsInteger.withDefault(0),
  size: parseAsInteger.withDefault(5),
};

export const paginationOptions = {
  shallow: false,
  clearOnDefault: true,
};

export const editCommentIdParser = parseAsString
  .withDefault('')
  .withOptions({ clearOnDefault: true, shallow: false });

const parsers = {
  search: searchParser,
  editCommentId: editCommentIdParser,
  ...sortParser,
  ...paginationParser,
};

export const searchParamsCache = createSearchParamsCache(parsers);
export type TicketsSearchParams = inferParserType<typeof parsers>;
