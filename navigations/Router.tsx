import commonStyle from '@/constants/Style';
import { useAuth } from '@/hooks/useAuth';
import Authenticated from '@/navigations/Authenticated';
import Unauthenticated from '@/navigations/Unauthenticated';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export const Router: React.FC = () => {
  const { isLoading, user } = useAuth();
  if (isLoading) {
    return (
      <View style={commonStyle.center}>
        <ActivityIndicator size='small' />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar
        style='dark'
        animated={true}
        backgroundColor='transparent'
        translucent
      />
      {user ? <Authenticated /> : <Unauthenticated />}
    </NavigationContainer>
  );
};
