import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { router,useNavigation } from 'expo-router';

const LoginScreen = () => {
  const navigation = useNavigation();

  const handleMaybeLaterClick = () => {
    navigation.navigate('Home'); // Navigate to HomeScreen
  };

  const handleContinueWithOTP = () => {
    router.replace('Screens/PhoneNumberInputScreen'); // Navigate to PhoneNumberInputScreen
  };

  return (
    <View style={styles.container}>
      {/* Background image */}
      <View style={styles.imageContainer}>
        <Image
          style={styles.backgroundImage}
          source={require('..//..//assets/splash.png')}
        />
      </View>

      <View style={styles.contentContainer}>
        {/* Title */}
        <Text style={styles.title}>Unlock Exclusive Benefits</Text>

        {/* Description */}
        <Text style={styles.description}>
          Elevate your shopping experience with ShopScanner. Access personalized notifications, exclusive deals, and top-value savings!
        </Text>

        {/* Continue with OTP Button */}
        <Button
          style={styles.button}
          mode="contained"
          onPress={handleContinueWithOTP}>
          Continue with OTP
        </Button>

        {/* Maybe later */}
        <Text
          style={styles.maybeLater}
          onPress={handleMaybeLaterClick}>
          Maybe later
        </Text>

        {/* Terms of Service and Privacy Policy */}
        <Text style={styles.terms}>
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  imageContainer: {
    flex: 0.7,
    height: '35%',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    padding: 35,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 16,
    color: '#333', // Darker color for better readability
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    marginBottom: 32,
    fontSize: 16,
    color: '#555', // Slightly lighter color
  },
  button: {
    marginTop: 16,
    width: '100%',
    backgroundColor: '#3498db', // A cool blue color
  },
  maybeLater: {
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 24,
    textDecorationLine: 'underline', // Underline the text to indicate it's clickable
  },
  terms: {
    color: '#555',
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 16,
    fontSize: 12,
  },
});

export default LoginScreen;
