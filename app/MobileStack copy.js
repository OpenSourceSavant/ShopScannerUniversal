import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Modal, Image, TouchableOpacity,View,Animated,StyleSheet } from 'react-native';
import HomeScreen from './Screens/HomeScreen';
import AllCategories from './Screens/AllCategories';
import NotificationScreen from './Screens/NotificationScreen';
import DealsList from './Screens/DealsList';
import Profile from './Screens/Profile';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useNavigation and useRoute
import { useLocalSearchParams } from 'expo-router';

const Tab = createBottomTabNavigator();
const Loader = () => {
  const translateX = new Animated.Value(-100); // Initial position of the loader

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: 300, // End position of the loader
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: -100, // Reset position of the loader
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [translateX]);

  return (
    <View style={styles.loaderRectangleContainer}>
      <View style={styles.loaderRectangleLine}>
        <Animated.View style={[styles.loaderBar, { transform: [{ translateX }] }]} />
      </View>
      <View style={styles.loaderLineContainer}>
        <View style={styles.loaderLine} />
        <Animated.View style={[styles.loaderBar, { transform: [{ translateX }] }]} />
      </View>
      <View style={styles.loaderLineContainer}>
        <View style={styles.loaderLine} />
        <Animated.View style={[styles.loaderBar, { transform: [{ translateX }] }]} />
      </View>
      <View style={styles.loaderLineContainer}>
        <View style={styles.loaderLine} />
        <Animated.View style={[styles.loaderBar, { transform: [{ translateX }] }]} />
      </View>
      <View style={styles.loaderLineContainer}>
        <View style={styles.loaderLine} />
        <Animated.View style={[styles.loaderBar, { transform: [{ translateX }] }]} />
      </View>
      <View style={styles.loaderLineContainer}>
        <View style={styles.loaderLine} />
        <Animated.View style={[styles.loaderBar, { transform: [{ translateX }] }]} />
      </View>
    </View>
  );
};



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
  const navigation = useNavigation();
  const route = useRoute();
  const [isNotificationModalVisible, setNotificationModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState(null);

  //params received
  const selectedTabReference = useLocalSearchParams().tabName;
  const lastRoute = useLocalSearchParams().lastRoute;
  const initialRouteSubCategory = useLocalSearchParams().initialRouteSubCategory;
  const tabbed = 'tabbed'


  useEffect(() => {


    if (selectedTabReference && ['Home', 'Categories', 'All Deals', 'Profile'].includes(selectedTabReference)) {
      console.log(selectedTabReference)
      setSelectedTab(selectedTabReference);
    }
    else if(lastRoute=='Categories'){
      setSelectedTab('Categories');
    }
    else{
      console.log('Home')
      setSelectedTab('Home');
    }
  }, [selectedTabReference,selectedTab]);

 

  const handleNotificationPress = () => {
    setNotificationModalVisible(true);
  };

  const closeModal = () => {
    setNotificationModalVisible(false);
  };

  const navigateToScreen = (screenName, params) => {
    navigation.navigate(screenName, params);
  };

  return (
    <>
      {selectedTab==null && (<Loader/>)}
      {selectedTab !== null && (
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#e91e63',
            headerRight: () => (
              <TouchableOpacity onPress={handleNotificationPress} style={{ marginRight: 16 }}>
                <Image
                  source={require('..//assets/notification.png')}
                  style={{
                    width: 28,
                    height: 28,
                    marginRight: 10,
                  }}
                />
              </TouchableOpacity>
            ),
            headerTitle: '',
          }}
          initialRouteName={selectedTab}
        
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            initialParams={{lastRoute}}
            options={{
              tabBarIcon: ({ color, size }) => (
                <CustomTabIcon icon={require('..//assets/homeicon.png')} color={color} size={size} />
              ),
              headerShown: false,
              
            }}
            listeners={{
              tabPress: () => navigateToScreen('Home', { lastRoute: 'MobileStack' }),
            }}
          />
          <Tab.Screen
            name="Categories"
            component={AllCategories}
            initialParams={{initialRouteSubCategory}}
            options={{
              tabBarIcon: ({ color, size }) => (
                <CustomTabIcon icon={require('..//assets/category.png')} color={color} size={size} />
              ),
              headerShown: false,
            }}
            listeners={{
              tabPress: () => navigateToScreen('Categories', { lastRoute: 'MobileStack' }),
            }}
          />
          <Tab.Screen
            name="All Deals"
            component={DealsList}
            initialParams={{tabbed}}
            options={{
              tabBarIcon: ({ color, size }) => (
                <CustomTabIcon icon={require('..//assets/all_icon.png')} color={color} size={size} />
              ),
              headerShown: false,
            }}
            listeners={{
              tabPress: () => navigateToScreen('All Deals', { lastRoute: 'MobileStack' }),
            }}
          />
          {/*
          <Tab.Screen
            name="Profile"
            component={Profile}
            visible={false}
            options={{
              tabBarIcon: ({ color, size }) => (
                <CustomTabIcon icon={require('..//assets/user.png')} color={color} size={size} />
              ),
              headerShown: false,
            }}
            listeners={{
              tabPress: () => navigateToScreen('Profile', { lastRoute: 'MobileStack' }),
            }}
          />
          */}
          
        </Tab.Navigator>
      )}
      
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

const styles = StyleSheet.create({
  loaderContainer: {
    padding: 30,
  },
  loaderCircle: {
    height: 60,
    width: 90,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
    marginBottom: 20,
  },

  loaderRectangleContainer: {
    marginBottom: 50,
    overflow: 'hidden',
    marginTop:20,
    marginLeft:10,
    borderRadius:10,
    marginRight:10
  },


  loaderLineContainer: {
    marginBottom: 50,
    overflow: 'hidden',
  },
  loaderLine: {
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },

  loaderRectangleLine: {
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  loaderBar: {
    height: '100%',
    width: '100%',
    backgroundColor: '#e0e0e0',
    position: 'absolute',
    left: 0,
    top: 0,
  },
});

export default MobileStack;
