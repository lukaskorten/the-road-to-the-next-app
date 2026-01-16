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
  size: parseAsInteger.withDefault(2),
};

export const paginationOptions = {
  shallow: false,
  clearOnDefault: true,
};

const parsers = {
  search: searchParser,
  ...sortParser,
  ...paginationParser,
};

export const searchParamsCache = createSearchParamsCache(parsers);
export type TicketsSearchParams = inferParserType<typeof parsers>;
