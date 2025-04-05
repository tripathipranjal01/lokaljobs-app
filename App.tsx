import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomTabs from './src/navigation/BottomTabs';
import { BookmarkProvider } from './src/context/BookmarkContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <BookmarkProvider>
        <NavigationContainer>
          <BottomTabs />
        </NavigationContainer>
      </BookmarkProvider>
    </SafeAreaProvider>
  );
}
