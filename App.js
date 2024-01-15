import React from 'react';
import { StatusBar } from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import Routes from './controller';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#4A5B48'} barStyle="light-content"/>
      <Routes/>
    </NavigationContainer>
  );
}
