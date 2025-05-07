import React from 'react';
import { useEffect } from 'react';
import { useRouter, useSegments, Stack, Slot } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { View } from 'react-native';

export default function ProtectedLayout() {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated() && !inAuthGroup) {
      // Redirect to the sign-in page if not authenticated
      router.replace('/login');
    } else if (isAuthenticated() && inAuthGroup && segments[1] !== '(tabs)') {
      // Only redirect to home if trying to access non-tab auth pages
      router.replace('/(auth)/(tabs)/home');
    }
  }, [segments]);

  // Only render children if authenticated
  if (!isAuthenticated()) {
    return null;
  }

  return (
    <Stack
    screenOptions={{
        headerShown: false, // 👈 Disable header here
      }}
    />
  );
}
