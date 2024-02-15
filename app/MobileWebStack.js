import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Modal, TouchableOpacity, Image, Platform } from 'react-native';
import HomeScreen from './Screens/HomeScreen';
import Login from './Screens/Login';
import AllCategories from './Screens/AllCategories';
import NotificationScreen from './Screens/NotificationScreen';
import { router, useNavigation } from 'expo-router';

const Tab = createBottomTabNavigator();

// CustomTabIcon component for rendering custom icons
const CustomTabIcon = ({ icon, color, size }) => {
  return (
    <Image
      source={icon}
      style={{
        width: size,
        height: size,
        tintColor: color,
      }}
    />
  );
};

const MobileStack = () => {
  const [isNotificationModalVisible, setNotificationModalVisible] = React.useState(false);

  const handleNotificationPress = () => {
    setNotificationModalVisible(true);
  };

  const closeModal = () => {
    setNotificationModalVisible(false);
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          elevation:10,
          headerTitleStyle: {
            fontSize: 20,
          },
          headerLeft: () => (
            <Image
              source={require('..//assets/icon.png')} // replace with the actual path to your image
              style={{
                width: 64,
                height: 64,
                marginLeft: 16,
                ...Platform.select({
                  android: {
                    elevation: 4, // for Android
                  },
                  web: {
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // for the web
                  },
                }),
              }}
            />
          ),
         /*
headerRight: () => (
    <TouchableOpacity onPress={handleNotificationPress} style={{ marginRight: 16 }}>
        <Image
            source={require('..//assets/notification.png')} // replace with the actual path to your image
            style={{
                width: 32,
                height: 32,
                marginRight: 10
            }}
        />
    </TouchableOpacity>
),
*/

          headerTitle: '', // Set an empty string to hide the title
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <CustomTabIcon icon={require('..//assets/home.png')} color={color} size={size} />
            ),
          }}
        />

      <Tab.Screen
        name="Categories"
        component={AllCategories}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity >
              {/* Replace the below Image component with your desired icon */}
              <Image
                source={require('..//assets/left-arrow.png')}
                style={{ width: 24, height: 24, marginLeft: 15 }}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color, size }) => (
            <CustomTabIcon icon={require('..//assets/category.png')} color={color} size={size} />
          ),
        })}
      />


       
    <Tab.Screen
          name="Profile"
          component={Login}
          options={{
            tabBarIcon: ({ color, size }) => (
              <CustomTabIcon icon={require('..//assets/user.png')} color={color} size={size} />
            ),
            headerShown: false,
          }}
        />

      </Tab.Navigator>

      {/* Notification Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={isNotificationModalVisible}
        onRequestClose={closeModal}
      >
        <NotificationScreen closeModal={closeModal} />
      </Modal>
    </>
  );
};

export default MobileStack;
