// app/index.jsx
// Entry point: redirect based on auth state

import { Redirect } from 'expo-router';
import useAppStore from '../store/useAppStore';

export default function Index() {
  const user = useAppStore((s) => s.user);
  return user ? <Redirect href="/(tabs)/tasks" /> : <Redirect href="/auth" />;
}
