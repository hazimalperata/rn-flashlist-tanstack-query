import { useCallback, useState } from 'react';

export default function useRefreshOnFocus(refetch: () => Promise<any>) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  }, [refetch]);

  return { isRefreshing, onRefresh };
}
