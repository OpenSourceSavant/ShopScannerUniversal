import React,{useState,useEffect} from 'react';
import { View, Text,StyleSheet,Image,ScrollView } from 'react-native';
import { Avatar, Button, Chip, List,Modal } from 'react-native-paper';
import {router} from 'expo-router';
import LoginScreen from './Login';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage from @react-native-async-storage/async-storage

const Profile = () => {

    const [showLoginScreen, setShowLoginScreen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkLoginStatus = async () => {
      try {
        
        const loginStatus = await AsyncStorage.getItem('isLoggedIn');
        console.log(loginStatus)
        setIsLoggedIn(loginStatus === 'true' ? true : false);
      } catch (error) {
        console.log('Error checking login status:',error);
      }
    };

    useEffect(() => {
      checkLoginStatus();
    }, []); // Empty dependency array ensures the effect runs only once on mount

    const handleCloseLogin = () => {
        setShowLoginScreen(false); // Hide the Login screen
      };

    

  return (
    <View style={{ flex: 1 }}>
            <View style={{ flex: 1,alignItems:'center' }}>  
              <Text style={{ fontSize: 20, marginTop: 20 }}>Profile</Text>
              <Avatar.Image
                size={80}
                source={require('./../../assets/usericon.png')}
                style={{
                    backgroundColor: 'grey',
                    marginVertical: 20,
                    padding: 0,
                    overflow: 'hidden'
                  }}        
                resizeMode="cover" // or "cover", "stretch", "center" as per your requirement
              />
              <Text style={{fontSize:21,marginBottom:10}}>Guest</Text>
              {isLoggedIn ? (
                <Text style={styles.loggedInText}>Logged In</Text>
              ) : (
                <Chip icon="login" onPress={() => setShowLoginScreen(true)}>
                  Login
                </Chip>
              )}
        
              <Text style={{ alignSelf: 'flex-start', marginLeft: 20,marginTop:20,fontSize:20 }}>My Account</Text>
            
              <View style={{flex:1,alignSelf: 'flex-start',paddingLeft:15,marginTop:10,width:'100%',paddingRight:15}}>  
        
        <List.Item
              title="Notification Settings"
              left={() => (
                <Image
                  source={require('..//..//assets/notification_icon.png')}
                  style={{ width: 24, height: 24, marginRight: 16 }}
                />
              )}
              titleStyle={{ color: 'black' }}
              onPress={() => console.log('Notification Settings Pressed')}
            />
      
        <View style={{ height: 1, width: '100%', backgroundColor: '#dfdfdf', marginTop: 10 }} />
  
        <List.Item
          title="About Us"
          left={() => ( <Image
            source={require('..//..//assets/aboutus_icon.png')}
            style={{ width: 24, height: 24, marginRight: 16 }}
          />)}
          titleStyle={{ color: 'black' }} // Set text color to black

          onPress={() => console.log('About Us Pressed')}
        />
              <View style={{ height: 1, width: '100%', backgroundColor: '#dfdfdf', marginTop: 10 }} />
  
        <List.Item
          title="FAQ"
          left={() => ( <Image
            source={require('..//..//assets/faq_icon.png')}
            style={{ width: 24, height: 24, marginRight: 16 }}
          />)}
          onPress={() => console.log('FAQ Pressed')}
          titleStyle={{ color: 'black' }} // Set text color to black

        />
                <View style={{ height: 1, width: '100%', backgroundColor: '#dfdfdf', marginTop: 10 }} />

          <List.Item
                  title="Affiliate Disclosure"
                  left={() => ( <Image
                    source={require('..//..//assets/affiliate_icon.png')}
                    style={{ width: 24, height: 24, marginRight: 16 }}
                  />)}
                  onPress={() => console.log('Affiliate Disclosure')}
                  titleStyle={{ color: 'black' }} // Set text color to black

              />
          <View style={{ height: 1, width: '100%', backgroundColor: '#dfdfdf', marginTop: 10 }} />
                    
        </View>  
            </View>  
    </View>
          );
};


const styles = StyleSheet.create({
  container: {
    padding: 20 ,
    flex:2/3,
    height:'100%',
    marginRight:10,
    overflow:'hidden',
    
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
