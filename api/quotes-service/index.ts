import { useInfiniteQuery } from '@tanstack/react-query';
import { quotesQueryKeys } from '@/api/quotes-service/queryKeys';
import { PaginationQueryParams } from '@/api/types';
import { QuotesResponse } from '@/api/quotes-service/types';
import { useIsFocused } from '@react-navigation/core';

export function useGetQuotes(params: Omit<PaginationQueryParams, 'skip'>) {
  const isFocused = useIsFocused();

  return useInfiniteQuery<QuotesResponse>({
    ...quotesQueryKeys.getQuotes(params),
    getNextPageParam: (data) => (data.skip < data.total ? data.skip / data.limit + 1 : undefined),
    getPreviousPageParam: (data) =>
      data.skip < data.total ? data.skip / data.limit - 1 : undefined,
    initialPageParam: 1,
    subscribed: isFocused,
  });
}
