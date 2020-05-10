import React from 'react';
import Routes from './src/routes'
import { NavigationContainer } from '@react-navigation/native';
import { NavigationNativeContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';

export default function PiuPiuwer() {

  // ignora warnings
  console.disableYellowBox = true;

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="hsla(207, 60%, 44%, 0.85)" />
      <Routes />
    </NavigationContainer>
  );
}
