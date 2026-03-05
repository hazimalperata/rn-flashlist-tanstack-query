import { useUniwind } from 'uniwind';

export default function useTheme() {
  const { theme } = useUniwind();

  return theme as 'dark' | 'light';
}
