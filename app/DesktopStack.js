import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const DesktopStack = () => {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../assets/icon.png')} style={styles.logo} />

      {/* Heading */}
      <Text style={styles.heading}>We Are Coming on Desktop</Text>

      {/* Subheading */}
      <Text style={styles.subHeading}>As soon as possible</Text>

      {/* Button */}
      <Button mode="contained" onPress={() => console.log('Button pressed')}>
        Subscribe for Updates
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Background color
    padding: 20,
  },
  logo: {
    width: 150, // Set the width of your logo as needed
    height: 150, // Set the height of your logo as needed
    resizeMode: 'contain',
    marginBottom: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default DesktopStack;
