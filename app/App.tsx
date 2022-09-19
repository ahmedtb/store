import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nManager } from 'react-native';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import axios from 'axios';
import _Environments from './env'

axios.defaults.baseURL = _Environments.BASE_URL


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  React.useEffect(() => {
    if (!I18nManager.isRTL)
      I18nManager.forceRTL(true);
  }, [])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
