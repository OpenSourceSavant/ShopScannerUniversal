import React, { useEffect, useState } from 'react';
import { Platform, Dimensions } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { router } from 'expo-router';

// Determine the platform and device type
const isMobileWeb = Platform.OS === 'web' && Dimensions.get('window').width <= 786;
const isMobileApp = Platform.OS === 'android' || Platform.OS === 'ios';
const isDesktop = Platform.OS === 'web' && Dimensions.get('window').width >= 1024;

const HomePage = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Set mounted flag to true after the component has mounted
  }, []);

  useEffect(() => {
    if (isFocused && isMounted) {
      navigateToRespectiveStack(); // Load initial data and handle navigation
    }
  }, [isFocused, isMounted]);

  const navigateToRespectiveStack = () => {
    if (isMobileApp) {
      router.replace('Splash');
    } else if (isMobileWeb) {
      router.replace('WebMobileStack');
    } else if (isDesktop) {
      router.replace('DesktopHomeScreen');
    }
  };

  // Since we don't want to return any HTML, we can just return null
  return null;
};

export default HomePage;
