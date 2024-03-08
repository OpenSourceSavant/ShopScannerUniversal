import React, { useEffect,useState } from 'react';
import { View, Platform, Dimensions, SafeAreaView } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import * as Notifications from 'expo-notifications';
import * as amplitude from '@amplitude/analytics-react-native';
import { track } from '@amplitude/analytics-react-native';

import MobileStack from './MobileStack';
import MobileWebStack from './MobileWebStack';
import DesktopHomeScreen from './DesktopHomeScreen';


const isWebMobile = Platform.OS === 'web' && Dimensions.get('window').width <= 786;
const isMobile = Platform.OS === 'android' || Platform.OS === 'ios';
const isDesktop = Platform.OS === 'web' && Dimensions.get('window').width >= 1024;


const HomePage = () => {




  useEffect(() => {
    amplitude.init('c1ed90ed03168877e05a8d1673295654');
    track('App Open');

    // Add any additional setup or logic you need
  }, []);

  

  return (
    <PaperProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {isWebMobile && <MobileWebStack />}
          {isMobile && <MobileStack />}
          {isDesktop && <DesktopHomeScreen />}
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default HomePage;
