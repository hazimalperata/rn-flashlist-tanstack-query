import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Link, Stack } from 'expo-router';
import { MoonStarIcon, SunIcon } from 'lucide-react-native';
import * as React from 'react';
import { ActivityIndicator, RefreshControl } from 'react-native';
import { Uniwind } from 'uniwind';
import useTheme from '@/hooks/useTheme';
import { useCallback, useMemo } from 'react';
import { useGetQuotes } from '@/api/quotes-service';
import { Quote } from '@/api/quotes-service/types';
import useRefreshOnFocus from '@/hooks/useRefreshOnFocus';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { ExtendedStackNavigationOptions } from 'expo-router/build/layouts/StackClient';
import QuoteItem from '@/components/QuetoItem';

const SCREEN_OPTIONS: ExtendedStackNavigationOptions = {
  title: 'Quotes',
  headerRight: () => <ThemeToggle />,
};

const PAGE_SIZE = 20;

export default function Screen() {
  const { data, refetch, isFetchingNextPage, fetchNextPage } = useGetQuotes({
    limit: PAGE_SIZE,
  });

  const allRows = useMemo(() => (data ? data.pages.flatMap((d) => d.quotes) : []), [data]);

  const { onRefresh, isRefreshing } = useRefreshOnFocus(refetch);

  const renderItem = useCallback(({ item, index }: ListRenderItemInfo<Quote>) => {
    return <QuoteItem item={item} index={index} />;
  }, []);

  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <Link href="/+not-found">
        <Text>Baska sayfa</Text>
      </Link>
      <FlashList
        removeClippedSubviews
        contentContainerClassName="pb-safe"
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        data={allRows}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
        onEndReached={() => fetchNextPage()}
        onEndReachedThreshold={0.8}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
      />
    </>
  );
}

const THEME_ICONS = {
  light: SunIcon,
  dark: MoonStarIcon,
};

function ThemeToggle() {
  const theme = useTheme();

  function toggleTheme() {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    Uniwind.setTheme(newTheme);
  }

  return (
    <Button
      onPressIn={toggleTheme}
      size="icon"
      variant="ghost"
      className="ios:size-9 web:mx-4 rounded-full">
      <Icon as={THEME_ICONS[theme ?? 'light']} className="size-5" />
    </Button>
  );
}
