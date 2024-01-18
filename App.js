import React, {useEffect, useState} from 'react';
import { StatusBar, ActivityIndicator, View, Image} from 'react-native';
import * as Font from 'expo-font';

import {NavigationContainer} from '@react-navigation/native';
import Routes from './controller/routes';

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Brice-RegularSemiExpanded': require('./assets/fonts/Brice-RegularSemiExpanded.ttf'),
        'Corporate-S-SC-Regular': require('./assets/fonts/Corporate-S-SC-Regular.otf')
      });
      setFontLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontLoaded) {
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#4A5B48' }}>
        <ActivityIndicator size="large" color="#4A5B48" />
        <Image source={require('./assets/logo.jpg')} style={{width: '50%', height:'50%'}}/>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#4A5B48'} barStyle="light-content"/>
      <Routes/>
    </NavigationContainer>
  );
}
