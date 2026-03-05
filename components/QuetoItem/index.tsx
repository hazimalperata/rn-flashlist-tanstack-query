import { memo } from 'react';
import { Quote } from '@/api/quotes-service/types';
import { View } from 'react-native';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';

const QuoteItem = memo(({ item, index }: { item: Quote; index: number }) => {
  return (
    <View className="flex flex-row items-start gap-x-3 p-4">
      <Badge>
        <Text>{index}</Text>
      </Badge>
      <View className="flex flex-1 flex-col gap-y-1">
        <Text className="flex-1 font-medium">{item.quote}</Text>
        <Text className="text-gray-500 italic">- {item.author}</Text>
      </View>
    </View>
  );
});

export default QuoteItem;
