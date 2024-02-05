import React from 'react';
import { View, Text } from 'react-native';
import { Link, useRouter } from 'expo-router';
import HomeScreen from './Screens/HomeScreen';
import DealsList from './Screens/DealsList';

const MobileWebStack = () => {
  const router = useRouter();

  return (
    
       <HomeScreen />
  );
};

export default MobileWebStack;
