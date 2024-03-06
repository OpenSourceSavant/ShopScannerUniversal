import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Modal, Image, Platform,View} from 'react-native';
import HomeScreen from './Screens/HomeScreen';
import AllCategories from './Screens/AllCategories';
import NotificationScreen from './Screens/NotificationScreen';
import { router, useNavigation } from 'expo-router';
import DealsList from './Screens/DealsListNew';

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
  
  const navigation = useNavigation(); // Add this line to get the navigation object

  const handleNotificationPress = () => {
    setNotificationModalVisible(true);
  };

  const closeModal = () => {
    setNotificationModalVisible(false);
  };

  const handleBackPress = () => {
    router.replace({ pathname: 'Screens/HomeScreen' });

  };

  

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
         
          
          
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
              <CustomTabIcon icon={require('..//assets/homeicon.png')} color={color} size={size} />
            ),
            headerShown: false  
                    }}
        />

        <Tab.Screen
          name="Categories"
          component={AllCategories}
          options={({ navigation }) => ({
          
            tabBarIcon: ({ color, size }) => (
              <CustomTabIcon icon={require('..//assets/category.png')} color={color} size={size} />
            ),
            headerShown: false  

          })}
        />

<Tab.Screen
        name="All Deals"
        component={DealsList}
        options={({ navigation }) => ({
        
          tabBarIcon: ({ color, size }) => (
            <CustomTabIcon icon={require('..//assets/all_icon.png')} color={color} size={size} />
          ),
          headerShown: false  

        })}
      />


     {/*  
    <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <CustomTabIcon icon={require('..//assets/user.png')} color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        */}
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
