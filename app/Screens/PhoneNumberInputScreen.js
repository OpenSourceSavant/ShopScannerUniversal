import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

const PhoneNumberInputScreen = () => {

  const [isOtpSent, setIsOtpSent] = useState(false);

  

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
        <View style={styles.container}>
  <Text style={styles.headerText}>Sign Up to Save your deals</Text>
  <View style={styles.inputContainer}>
    <View style={styles.countryCodeContainer}>
      {/* You can replace the IconButton with your country code and flag */}
      <IconButton icon="flag" />
      <Text style={styles.countryCodeText}>+91</Text>
    </View>
    <TextInput
      style={styles.mobileInput}
      placeholder="Mobile Number"
      keyboardType="phone-pad"
      onChangeText={text => setPhoneNumber(text)}
      value={phoneNumber}
    />
  </View>
  <Button
    title="Send OTP"
    onPress={handleSendOtp}
    disabled={phoneNumber.length !== 10}
    style={styles.button}
  />
  <Text style={styles.termsText}>By continuing you agree to terms</Text>
</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
 
});

export default PhoneNumberInputScreen;
