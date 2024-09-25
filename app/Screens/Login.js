import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { router,useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [showMobileNumberScreen, setShowMobileNumberScreen] = useState(false);
  const deviceId = AsyncStorage.getItem('deviceId');

  const handleClose = () => {
    router.replace({ pathname: 'MobileStack', params: { tabName: 'Profile' } })

  };

  const handleContinueWithOTP = () => {
    router.replace('Screens/LoginMobileNumberScreen');
  };

  const handleMaybeLaterClick = () => {
    router.replace('MobileStack');
  };

  return (
    <View style={styles.LoginViewcontainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.backgroundImage}
          source={require('..//..//assets/login_top2.png')}
        />
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Unlock Exclusive Benefits</Text>

        <Text style={styles.description}>
          Elevate your shopping experience with ShopScanner. Access personalized notifications, exclusive deals, and top-value savings!
        </Text>

        <Button
          style={styles.button}
          mode="contained"
          onPress={handleContinueWithOTP}
        >
          Continue with OTP
        </Button>

        <Text style={styles.maybeLater} onPress={handleMaybeLaterClick}>
          Maybe later
        </Text>

        <Text style={styles.terms}>
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  LoginViewcontainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  imageContainer: {
    flex: 0.5,
    height: '35%',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    paddingLeft: 35,
    paddingRight: 35,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    marginBottom: 32,
    fontSize: 16,
    color: '#555',
  },
  button: {
    marginTop: 16,
    width: '100%',
    backgroundColor: '#3498db',
  },
  maybeLater: {
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 24,
    textDecorationLine: 'underline',
  },
  terms: {
    color: '#555',
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 16,
    fontSize: 12,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default LoginScreen;
