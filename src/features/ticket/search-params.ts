import {
  createSearchParamsCache,
  inferParserType,
  parseAsString,
} from 'nuqs/server';

const parsers = {
  search: parseAsString.withDefault(''),
  sort: parseAsString.withDefault('newest'),
};

export const searchParamsCache = createSearchParamsCache(parsers);
export type TicketsSearchParams = inferParserType<typeof parsers>;
