// app/_layout.jsx
// Root layout: rehydrates global state and routes to auth or main app

import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import useAppStore from '../store/useAppStore';
import LoadingOverlay from '../components/LoadingOverlay';

export default function RootLayout() {
  const rehydrate = useAppStore((s) => s.rehydrate);
  const isAuthLoading = useAppStore((s) => s.isAuthLoading);

  useEffect(() => {
    // Rehydrate persisted state (auth token, filter preference) on app launch
    rehydrate();
  }, []);

  if (isAuthLoading) {
    return <LoadingOverlay message="Starting up…" />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="task/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="task/create" options={{ headerShown: false }} />
        <Stack.Screen name="task/edit/[id]" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
