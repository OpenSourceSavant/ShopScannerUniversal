import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Link, useRouter } from 'expo-router';
import { Text,Pressable } from 'react-native';
import HomeScreen from './Screens/HomeScreen';
import Login from './Screens/Login';
import AllCategories from './Screens/AllCategories';

import { Ionicons } from '@expo/vector-icons';
import DealsList from './Screens/DealsList';

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
      <Tab.Screen
        name="Home"
        component={DealsList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Categories"
        component={AllCategories}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="DealsList"
        component={DealsList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
          headerShown: true,

        }}
      />
      <Tab.Screen
        name="Profile"
        component={Login}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
          headerShown: false,

        }}
      />
    

    </Tab.Navigator>
  );
};

export default MobileStack;
