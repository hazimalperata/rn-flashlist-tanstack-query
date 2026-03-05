import { Stack, useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { useCallback } from 'react';

export default function NotFoundScreen() {
  const router = useRouter();

  const onPress = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  }, [router]);

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View>
        <Text>This screen doesn&#39;t exist.</Text>
        <Pressable onPress={onPress}>
          <Text>Go to home screen!</Text>
        </Pressable>
      </View>
    </>
  );
}
