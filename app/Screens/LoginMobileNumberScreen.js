import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { router, useNavigation } from 'expo-router';

const LoginMobileNumberScreen = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpValue, setOtpValue] = useState('');

  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text);
  };

  const handleClose = () => {
    // Logic to close the screen, if necessary
    navigation.goBack();
  };

  const isPhoneNumberValid = phoneNumber.length === 10;

  const sendOtp = async () => {
    const generateOtp = () => {
      return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const otpCode = generateOtp();
    setOtpValue(otpCode);

    const apiKey = 'opin)Jm<_?*Z=I-Ugif;hf!(Q!Wk{AQa';
    const mobileNumberWithCountryCode = '91' + phoneNumber; // Use the phoneNumber variable from your state
    console.log(mobileNumberWithCountryCode);

    const requestBody = {
      mobile: mobileNumberWithCountryCode,
      otp: otpCode,
    };

    setIsLoading(true); // Start loading state

    try {
      const response = await fetch('https://send-otp-dynb6o5ava-uc.a.run.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        // OTP sent successfully
        router.replace({ pathname: 'Screens/OTPScreen', params: { phoneNumber: mobileNumberWithCountryCode, otpValue: otpCode } });

      } else {
        // Handle error response
        const errorData = await response.json();
        setSnackbarMessage(errorData.message || 'Failed to send OTP. Please try again.');
        setIsSnackbarVisible(true);
      }
    } catch (error) {
      // Handle fetch error
      console.error(error);
      setSnackbarMessage('An error occurred. Please try again.');
      setIsSnackbarVisible(true);
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  const handleSendOtp = () => {
    if (isPhoneNumberValid) {
      sendOtp(); // Call sendOtp function
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.2, width: '100%' }}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.MobileNumberContainer}>
        <Text style={styles.headerText}>Sign Up to Save your deals</Text>

        <View style={styles.inputContainer}>
          <View style={styles.countryCodeContainer}>
            <Image
              source={require('../../assets/india.png')}
              style={styles.flagImage}
            />
            <Text style={styles.countryCodeText}>+91</Text>
          </View>

          <TextInput
            style={styles.mobileInput}
            mode="outlined"
            label="Mobile Number"
            keyboardType="phone-pad"
            onChangeText={handlePhoneNumberChange}
            value={phoneNumber}
            maxLength={10}
          />
        </View>

        <Button
          mode="contained"
          onPress={handleSendOtp}
          disabled={!isPhoneNumberValid || isLoading}
          style={[styles.sendOTPButton, { backgroundColor: isPhoneNumberValid ? '#3498db' : '#ccc' }]} // Change color based on validity
        >
          {isLoading ? 'Sending...' : 'Send OTP'}
        </Button>

        <Text style={styles.termsText}>
          By continuing, you agree to the ShopScanner terms and conditions.
        </Text>

        <Snackbar
          visible={isSnackbarVisible}
          onDismiss={() => setIsSnackbarVisible(false)}
          duration={2000}
        >
          {snackbarMessage}
        </Snackbar>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  MobileNumberContainer: {
    padding: 10,
    marginTop: 70,
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
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginTop: 4,
  },
  countryCodeText: {
    fontSize: 16,
    marginRight: 5,
  },
  mobileInput: {
    flex: 1,
    height: 45,
    paddingHorizontal: 2,
    textAlignVertical: 'center',
  },
  sendOTPButton: {
    width: '100%',
    marginBottom: 20,
  },
  termsText: {
    fontSize: 12,
    textAlign: 'center',
  },
  flagImage: {
    width: 20,
    height: 20,
  },
});

export default LoginMobileNumberScreen;
