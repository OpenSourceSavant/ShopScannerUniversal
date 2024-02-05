import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Link, useRouter } from 'expo-router';
import { Text,Pressable } from 'react-native';
import HomeScreen from './Screens/HomeScreen';

const Tab = createBottomTabNavigator();



const ProfileScreen = () => (
  <Pressable onPress={handleLogout}>
    <Text>Logout</Text>
  </Pressable>
);

const handleLogout = () => {
    router.replace('/login');
  };
const MobileStack = () => {
  const router = useRouter();

 

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Categories" component={ProfileScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MobileStack;
