import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { ErrorBoundary } from '@/components/ErrorBoundary';

function RootLayoutNav() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    console.log('Auth state:', { user, isLoading, segments });
    
    if (isLoading) {
      console.log('Still loading...');
      return;
    }

    const currentRoute = segments[0];
    const isAuthRoute = currentRoute === 'signin' || currentRoute === 'signup';

    console.log('Navigation check:', { currentRoute, isAuthRoute, user: !!user });

    // Only redirect if we're not already on the correct route
    if (!user && currentRoute !== 'signin') {
      console.log('Redirecting to signin');
      router.replace('/signin');
    } else if (user && isAuthRoute) {
      console.log('Redirecting to tabs');
      router.replace('/(tabs)');
    }
  }, [user, isLoading]); // Removed segments from dependency to avoid infinite loops

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="signin" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="task" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  useFrameworkReady();

  return (
    <ErrorBoundary>
      <AuthProvider>
        <RootLayoutNav />
        <StatusBar style="auto" />
      </AuthProvider>
    </ErrorBoundary>
  );
}
