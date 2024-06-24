import React from 'react';
import { View, Text, FlatList, TouchableOpacity,Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router'; // Import the router instance from 'expo-router'
import { ActivityIndicator, Appbar } from 'react-native-paper';
import FastImage from 'react-native-fast-image'; // Import FastImage
import logo from '..//..//assets/icon.png';
import notification from '..//..//assets/notification.png';


const notificationsData = [
  { id: 1, message: 'Notification 1: Lorem ipsum dolor sit amet.' },
  { id: 2, message: 'Notification 2: consectetur adipiscing elit.' },
  { id: 3, message: 'Notification 3: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  // Add more notifications as needed
];

const NotificationScreen = () => {
  const handleLeftPress = () => {
    // Use the router instance to navigate back
    router.back()
  };

  return (
    <View>
      {/* Custom App Bar */}

      <Appbar.Header style={{ height: 40, marginTop: -15,backgroundColor:'#fff' }}>
            <Image source={logo} style={{ width: 55, height: 55, marginLeft: 10 }} />
            <View style={{ flex: 1 }}></View>
           

          </Appbar.Header>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 56,
          backgroundColor: 'white',
          borderBottomWidth: 1,
          borderBottomColor: '#ddd',
          paddingHorizontal: 16,
        }}
      >
        <TouchableOpacity onPress={handleLeftPress}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Notifications</Text>
        {/* Add your right press logic here */}
      </View>

      {/* Notifications List */}
      <FlatList
        data={notificationsData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
            <Text>{item.message}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default NotificationScreen;
