import React, { useEffect } from 'react';
import { Image, View,Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs, query, addDoc, where, updateDoc } from 'firebase/firestore';
import { db } from '..//firebaseConfig';
import * as Device from 'expo-device';
import * as Application from 'expo-application';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';



const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const initApp = async () => {
      try {
        await requestTrackingPermission();

        const isFirstTimeUser = await AsyncStorage.getItem('isFirstTimeUser');
        if (isFirstTimeUser === null || isFirstTimeUser === 'true') {
          // First time user logic
          //navigation.replace('Screens/Intro');  // Navigate to intro screen

          //this we will change in next release
          router.replace({ pathname: 'MobileStack', params: { lastRoute: 'Splash' } });
        } else {
          router.replace({ pathname: 'MobileStack', params: { lastRoute: 'Splash' } });
        }
      } catch (error) {
        console.error('Error initializing app:', error);
        // Handle error gracefully
      }
    };

    initApp();
  }, []);

  const requestTrackingPermission = async () => {
    if (Platform.OS === 'ios') {
      const { requestTrackingPermissionsAsync } = await import('expo-tracking-transparency');
      const { status } = await requestTrackingPermissionsAsync();
      if (status === 'granted') {
        const { firebase } = await import('@react-native-firebase/analytics');
        const analytics = firebase.analytics();
        await analytics.setAnalyticsCollectionEnabled(true);
        await analytics.setConsent({
          analytics_storage: true,
          ad_storage: true,
          ad_user_data: true,
          ad_personalization: true,
        });

        const firebaseAnalyticsModule = await import('@react-native-firebase/analytics');
        const analyticsInstance = firebaseAnalyticsModule.default();
        await analyticsInstance.logEvent('ios_app_open');
        await analyticsInstance.setAnalyticsCollectionEnabled(true);

       

      } else {
        // Handle tracking permission denied
      }

      const Notifications = await import('expo-notifications');
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

      const projectId = Constants.expoConfig.extra.eas.projectId;
      const expoPushToken = await Notifications.getExpoPushTokenAsync({ projectId });

      console.log('Expo Push Token:', expoPushToken);
      const iosVendorId = await Application.getIosIdForVendorAsync();
      console.log('iOS Vendor ID:', iosVendorId);

      const fetchAndUpdateExpoTokens = async () => {
        try {
          const expoTokensQuery = query(
            collection(db, 'expo-tokens'),
            where('iOSVendorId', '==', iosVendorId)
          );

          const querySnapshot = await getDocs(expoTokensQuery);

          if (querySnapshot.size > 0) {
            const existingToken = querySnapshot.docs.find(doc => doc.data().expoPushToken === expoPushToken.data);

            if (!existingToken) {
              const DocRef = querySnapshot.docs[0].ref;
              await updateDoc(DocRef, { expoPushToken: expoPushToken.data });
              console.log('Expo token updated for existing document with ID:', querySnapshot.docs[0].id);
            }
          } else {
            const expoTokensRef = collection(db, 'expo-tokens');

            const newTokenData = {
              'iosVendorId': iosVendorId,
              'expoPushToken': expoPushToken.data,
              'platform': 'iOS',
            };

            await addDoc(expoTokensRef, newTokenData);
            console.log('New device added and token added.');
          }

        } catch (error) {
          console.error('Error fetching or updating expo tokens:', error);
        }
      };

      fetchAndUpdateExpoTokens();

    } else if (Platform.OS === 'android' && Device.isDevice) {
      try {
        await AsyncStorage.setItem('device', 'android');
        const { firebase } = await import('@react-native-firebase/analytics');
        const analytics = firebase.analytics();
        await analytics.setAnalyticsCollectionEnabled(true);
        await analytics.logEvent('android_app_open');
        await analytics.setAnalyticsCollectionEnabled(true);
        
        const amplitude = await import('@amplitude/analytics-react-native');
        const { track } = await import('@amplitude/analytics-react-native');
        amplitude.init('c1ed90ed03168877e05a8d1673295654');
        track('Android app open');

        const Notifications = await import('expo-notifications');
        Notifications.setNotificationHandler({
          handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
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

        const projectId = Constants.expoConfig.extra.eas.projectId;
        const expoPushToken = await Notifications.getExpoPushTokenAsync({ projectId });
        console.log('Expo Push Token:', expoPushToken);

        const androidDeviceId = Application.getAndroidId();
        await AsyncStorage.setItem('deviceId', androidDeviceId);
        await AsyncStorage.setItem('deviceType', 'android');

        const usersQuery = query(
          collection(db, 'users'),
          where('deviceId', '==', androidDeviceId)
        );

        const querySnapshot = await getDocs(usersQuery);

        if (querySnapshot.size === 0) {
          const newUser = {
            deviceId: androidDeviceId,
            type: 'android',  // or 'ios' depending on the platform
          };
    
          await addDoc(collection(db, 'users'), newUser);
          console.log('New user added.');
        } else {
          const userDoc = querySnapshot.docs[0];
          const userDocRef = userDoc.ref;
          const istTimestamp = new Date(Date.now());
          await updateDoc(userDocRef, {
            lastOpenTime: istTimestamp  // Update lastLoginTime with current server timestamp
          });

          
          
          console.log('User with this device ID already exists.');
        }

        

        

        const fetchAndUpdateExpoTokens = async () => {
          try {
            const expoTokensQuery = query(
              collection(db, 'expo-tokens'),
              where('androidDeviceId', '==', androidDeviceId)
            );

            const querySnapshot = await getDocs(expoTokensQuery);

            if (querySnapshot.size > 0) {
              const existingToken = querySnapshot.docs.find(doc => doc.data().expoPushToken === expoPushToken.data);

              if (!existingToken) {
                const DocRef = querySnapshot.docs[0].ref;
                await updateDoc(DocRef, { expoPushToken: expoPushToken.data });
                console.log('Expo token updated for existing document with ID:', querySnapshot.docs[0].id);
              }
            } else {
              const expoTokensRef = collection(db, 'expo-tokens');

              const newTokenData = {
                'androidDeviceId': androidDeviceId,
                'expoPushToken': expoPushToken.data,
                'platform': 'android',
              };

              await addDoc(expoTokensRef, newTokenData);
              console.log('New device added and token added.');
            }

          } catch (error) {
            console.error('Error fetching or updating expo tokens:', error);
          }
        };

        fetchAndUpdateExpoTokens();

        

      } catch (error) {
        console.error('Error while importing or using analytics:', error);
      }
      finally{
        
      }

    }


  };

 

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={require('../assets/splash_screen_final.png')} style={{height:'100%',width:'100%'}}></Image>
    </View>
  );
};

export default Splash;
