import React from 'react';
import Routes from './src/routes'
import { NavigationContainer } from '@react-navigation/native';
import { NavigationNativeContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';

export default function PiuPiuwer() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Routes />
    </NavigationContainer>
  );
}
