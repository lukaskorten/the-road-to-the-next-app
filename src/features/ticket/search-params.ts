import {
  createSearchParamsCache,
  inferParserType,
  parseAsString,
} from 'nuqs/server';

/**
 * @deprecated
 */
export type SearchParams = {
  search: string | undefined | string[];
  sort: string | undefined | string[];
};

const parsers = {
  search: parseAsString.withDefault(''),
  sort: parseAsString.withDefault('newest'),
};

export const searchParamsCache = createSearchParamsCache(parsers);
export type TicketsSearchParams = inferParserType<typeof parsers>;
