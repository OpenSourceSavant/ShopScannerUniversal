import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const PhoneNumberInputScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const validatePhoneNumber = () => {
    // Add your validation logic here
    return /^\d{10}$/.test(phoneNumber); // Example: 10 digits only
  };

  const handleSendOtp = () => {
    if (validatePhoneNumber()) {
      // Simulate sending OTP (replace with your actual OTP sending logic)
      setIsOtpSent(true);
    }
  };

  const handleOtpSubmit = () => {
    // Add logic to verify OTP (replace with your actual OTP verification logic)
    console.log('OTP Submitted:', otp);
  };

  return (
    <View style={styles.container}>
      {isOtpSent ? (
        <View>
          <Text style={styles.infoText}>Enter OTP</Text>
          <TextInput
            style={styles.input}
            placeholder="OTP"
            keyboardType="numeric"
            onChangeText={(text) => setOtp(text)}
            value={otp}
          />
          <Button
            title="Submit OTP"
            onPress={handleOtpSubmit}
            disabled={otp.length !== 6}
          />
        </View>
      ) : (
        <View>
          <Text style={styles.infoText}>Enter Mobile Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            keyboardType="numeric"
            onChangeText={(text) => setPhoneNumber(text)}
            value={phoneNumber}
          />
          <Button
            title="Send OTP"
            onPress={handleSendOtp}
            disabled={!validatePhoneNumber()}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default PhoneNumberInputScreen;
