import { queryClient } from '@/api/queryClient';
import { SystemFonts } from '@/constants/Fonts';
import { AuthProvider } from '@/context/AuthProvider';
import { ModalProvider } from '@/context/ModalProvider';
import { Router } from '@/navigations/Router';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSyncQueriesExternal } from 'react-query-external-sync';
import { LanguageProvider } from './context/LanguageContext';

const AppContent: React.FC = () => {
  const [loaded, error] = useFonts(SystemFonts);

  useEffect(() => {
    SplashScreen.hideAsync();
  }, [loaded]);

  // Automatically disabled in production
  useSyncQueriesExternal({
    queryClient,
    socketURL: 'http://localhost:42831', // Default port for React Native DevTools
    deviceName: Platform?.OS || 'web', // Platform detection
    platform: Platform?.OS || 'web', // Use appropriate platform identifier
    deviceId: Platform?.OS || 'web', // Use a PERSISTENT identifier (see note below)
    extraDeviceInfo: {
      // Optional additional info about your device
      appVersion: '1.0.0',
      // Add any relevant platform info
    },
    enableLogs: true,
    envVariables: {
      NODE_ENV: process.env.NODE_ENV,
      // Add any private environment variables you want to monitor
      // Public environment variables are automatically loaded
    },
    // Storage monitoring with CRUD operations
    //mmkvStorage: storage, // MMKV storage for ['#storage', 'mmkv', 'key'] queries + monitoring
    asyncStorage: AsyncStorage, // AsyncStorage for ['#storage', 'async', 'key'] queries + monitoring
    secureStorage: SecureStore, // SecureStore for ['#storage', 'secure', 'key'] queries + monitoring
    secureStorageKeys: ['accessToken'], // SecureStore keys to monitor
  });

  // Check if fonts are loaded
  if (!loaded) return null;
  return (
    <GestureHandlerRootView>
      <ModalProvider>
        <BottomSheetModalProvider>
          <LanguageProvider>
            <AuthProvider>
              <Router />
            </AuthProvider>
          </LanguageProvider>
        </BottomSheetModalProvider>
      </ModalProvider>
    </GestureHandlerRootView>
  );
};

// Prevent auto-hide of splash screen
SplashScreen.preventAutoHideAsync();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
};

export default App;
