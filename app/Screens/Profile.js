import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Avatar, Chip, List } from 'react-native-paper';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [showLoginScreen, setShowLoginScreen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('Guest');

  const checkLoginStatus = async () => {
    try {
      const loginStatus = await AsyncStorage.getItem('isLoggedIn');
      if (loginStatus === 'true') {
        setIsLoggedIn(true);
        const name = await AsyncStorage.getItem('name');
        if (name && name !== '') {
          setUserName(name);
        }
      } else {
        console.log('Not logged in');
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log('Error checking login status:', error);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleCloseLogin = () => {
    setShowLoginScreen(false); // Hide the Login screen
  };

  const showLogin = () => {
    router.push({ pathname: 'Screens/Login' });
  };

  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.setItem('isLoggedIn', 'false');
    await AsyncStorage.removeItem('name');
    
    setUserName('Guest');
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ fontSize: 20, marginTop: 20 }}>Profile</Text>
        <Avatar.Image
          size={60}
          source={require('./../../assets/usericon.png')}
          style={{
            backgroundColor: '#dfdfdf',
            marginVertical: 20,
            padding: 0,
            overflow: 'hidden',
          }}
          resizeMode="cover" // or "cover", "stretch", "center" as per your requirement
        />
        <Text style={{ fontSize: 21, marginBottom: 10 }}>{userName}</Text>
        {isLoggedIn ? (
          <Chip icon="logout" onPress={() => logout()}>
            Logout
          </Chip>
        ) : (
          <Chip icon="login" onPress={() => showLogin()}>
            Login
          </Chip>
        )}

        <Text style={{ alignSelf: 'flex-start', marginLeft: 20, marginTop: 20, fontSize: 20 }}>My Account</Text>

        <View style={{ flex: 1, alignSelf: 'flex-start', paddingLeft: 15, marginTop: 10, width: '100%', paddingRight: 15 }}>
          <List.Item
            title="Notification Settings"
            left={() => (
              <Image
                source={require('..//..//assets/notification.png')}
                style={{ width: 24, height: 24, paddingRight: 16 }}
              />
            )}
            titleStyle={{ color: 'black' }}
            onPress={() => router.push('Screens/NotificationSettings')}
          />

          <View style={{ height: 0.5, width: '100%', backgroundColor: '#dfdfdf' }} />

          <List.Item
            title="About Us"
            left={() => (
              <Image
                source={require('..//..//assets/aboutus_icon.png')}
                style={{ width: 24, height: 24, paddingRight: 16 }}
              />
            )}
            titleStyle={{ color: 'black' }} // Set text color to black
            onPress={() => router.push('Screens/AboutUs')}
          />

          <View style={{ height: 0.5, width: '100%', backgroundColor: '#dfdfdf' }} />

          <List.Item
            title="FAQ"
            left={() => (
              <Image
                source={require('..//..//assets/faq_icon.png')}
                style={{ width: 24, height: 24, paddingRight: 16 }}
              />
            )}
            onPress={() => console.log('FAQ Pressed')}
            titleStyle={{ color: 'black' }} // Set text color to black
          />

          <View style={{ height: 1, width: '100%', backgroundColor: '#dfdfdf' }} />

          <List.Item
            title="Affiliate Disclosure"
            left={() => (
              <Image
                source={require('..//..//assets/affiliate_icon.png')}
                style={{ width: 24, height: 24, paddingRight: 16 }}
              />
            )}
            onPress={() => console.log('Affiliate Disclosure')}
            titleStyle={{ color: 'black' }} // Set text color to black
          />

          <View style={{ height: 1, width: '100%', backgroundColor: '#dfdfdf' }} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 2 / 3,
    height: '100%',
    marginRight: 10,
    overflow: 'hidden',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  priceRange: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 1,
  },
});

export default Profile;
