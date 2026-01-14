import {
  createSearchParamsCache,
  inferParserType,
  parseAsString,
} from 'nuqs/server';

export const parsers = {
  search: parseAsString
    .withDefault('')
    .withOptions({ shallow: false, clearOnDefault: true }),
  sort: parseAsString
    .withDefault('newest')
    .withOptions({ shallow: false, clearOnDefault: true }),
};

export const searchParamsCache = createSearchParamsCache(parsers);
export type TicketsSearchParams = inferParserType<typeof parsers>;
