import React, { useEffect } from 'react';
import { View, Text, Linking } from 'react-native';

const Download = () => {
  useEffect(() => {
    // Add any additional initialization logic or API calls if needed
    handleRedirect();
  }, []);

  const handleRedirect = () => {
    let storeURL;
    const userAgent = window.navigator.userAgent.toLowerCase();
    
    if (userAgent.indexOf('android') > -1) {
      storeURL = 'https://play.google.com/store/apps/details?id=com.shopscanner.wave';
    } else if (userAgent.indexOf('iphone') > -1 || userAgent.indexOf('ipad') > -1 || userAgent.indexOf('ipod') > -1) {
      storeURL = 'https://apps.apple.com/ie/app/apple-business-essentials/id1588151344';
    }
  
    if (storeURL) {
      // Open the URL in a new tab
      window.open(storeURL, '_blank');
    }
  };
  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>You are being redirected to the store...</Text>
    </View>
  );
};

export default Download;
