import React, { useEffect, useState } from 'react';
import { View, Platform, Dimensions, SafeAreaView } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import * as Notifications from 'expo-notifications';
import { Application } from 'expo-application';
import { collection, getDocs, query, orderBy, limit,addDoc } from 'firebase/firestore';
import { db } from '..//firebaseConfig';

import MobileStack from './MobileStack';
import MobileWebStack from './MobileWebStack';
import DesktopHomeScreen from './DesktopHomeScreen';

const isWebMobile = Platform.OS === 'web' && Dimensions.get('window').width <= 786;
const isMobile = Platform.OS === 'android' || Platform.OS === 'ios';
const isDesktop = Platform.OS === 'web' && Dimensions.get('window').width >= 1024;

const HomePage = () => {
  useEffect(() => {
    requestTrackingPermission(); // Request tracking permissions

    // Add any additional setup or logic you need
  }, []);

  const initializeAmplitude = () => {
   
    // Additional Amplitude initialization logic can be added here
  };

  const requestTrackingPermission = async () => {
    if (isMobile) {
      
      /////////////////////IOS PART /////////////////////////////////////
      if (Platform.OS === 'ios') {
        const { requestTrackingPermissionsAsync } = await import('expo-tracking-transparency');
        const { status } = await requestTrackingPermissionsAsync();
        if (status === 'granted') {
          const {amplitude} = await import ('@amplitude/analytics-react-native');
          const { track } =await import('@amplitude/analytics-react-native');
          amplitude.init('c1ed90ed03168877e05a8d1673295654');
          track('App Open');
       
        } else {
          // Tracking permission denied, handle accordingly
        }
      } 

      ////////////////////////ANDROID PART ////////////////////////////////////////
      else if (Platform.OS === 'android'){
        try {
          const {amplitude} = await import('@amplitude/analytics-react-native');
          const { track } =await import('@amplitude/analytics-react-native');
          amplitude.init('c1ed90ed03168877e05a8d1673295654');
          track('App Open');
          
    
         
          const Notifications = await import('expo-notifications');
          const Device = await import('expo-device'); 



          Notifications.setNotificationHandler({
            handleNotification: async () => ({
              shouldShowAlert: true,
              shouldPlaySound: false,
              shouldSetBadge: false,
            }),
          });

          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }

          const expoPushToken = (await Notifications.getExpoPushTokenAsync()).data;
          console.log('Expo Push Token:', expoPushToken);
           // Get the Android device ID
          androidDeviceId = Device.osBuildFingerprint;
          console.log('Android Device ID:', androidDeviceId);

          const fetchAndUpdateExpoTokens = async () => {
            try {
              const expoTokensQuery = query(collection(db, 'expo-tokens'));
              const querySnapshot = await getDocs(expoTokensQuery);
          
              const fetchedTokens = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
          
              const existingDevice = fetchedTokens.find(token => token.androidDeviceId === androidDeviceId);
          
              if (existingDevice) {
                const existingToken = fetchedTokens.find(token => token.androidDeviceId === androidDeviceId && token.expoPushToken === expoPushToken);
          
                if (!existingToken) {
                  // If the combination doesn't exist, update Firestore with the new expoPushToken
                  const expoTokensRef = collection(db, 'expo-tokens');
                  const existingTokenDoc = fetchedTokens.find(token => token.androidDeviceId === androidDeviceId);
          
                  if (existingTokenDoc) {
                    // If the device exists, update the existing document with the new expoPushToken
                    const tokenDocRef = doc(expoTokensRef, existingTokenDoc.id);
                    await updateDoc(tokenDocRef, { expoPushToken });
                    console.log('Expo token updated for existing document with ID: ', existingTokenDoc.id);
                  }
                }
              } else {
                // If the device doesn't exist, add a new document directly
                const expoTokensRef = collection(db, 'expo-tokens');
                const newTokenData = {
                  androidDeviceId,
                  expoPushToken,
                  platform: 'android',
                  // ... other token properties if any
                };
          
                const newTokenDocRef = await addDoc(expoTokensRef, newTokenData);
                console.log('New expo token added with ID: ', newTokenDocRef.id);
              }
            } catch (error) {
              console.error('Error fetching or updating expo tokens:', error);
            }
          };
          
          // Call the fetchAndUpdateExpoTokens function to initiate the process
          fetchAndUpdateExpoTokens();
          

      


        }

 









       
          

           // Corrected event name to 'app_open'
         catch (error) {
          // Handle the error appropriately
          console.error('Error while importing or using analytics:', error);
        }


      }
      else {
        // For platforms other than iOS, automatically allow tracking
          const {amplitude} = await import('@amplitude/analytics-react-native');
          const { track } =await import('@amplitude/analytics-react-native');
          amplitude.init('c1ed90ed03168877e05a8d1673295654');
          track('App Open');
      }
    }
  };

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
