import { createQueryKeys } from '@lukemorales/query-key-factory';
import { PaginationQueryParams } from '@/api/types';
import { getRequest } from '@/api/requests';
import { QuotesResponse } from '@/api/quotes-service/types';

export const QUOTES_PREFIX = 'quotes/';

export const quotesQueryKeys = createQueryKeys(QUOTES_PREFIX, {
  getQuotes: (params: Omit<PaginationQueryParams, 'skip'>) => ({
    queryKey: [params],
    queryFn: async ({ signal, pageParam }: { signal: any; pageParam: number }) =>
      await getRequest<QuotesResponse>(QUOTES_PREFIX, {
        params: {
          ...params,
          skip: params.limit ? pageParam * params.limit : undefined,
        },
        signal,
      }),
  }),
});
