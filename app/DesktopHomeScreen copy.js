import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import TopDesktopCarousel from './Components/TopDesktopCarousel';
import logo from '..//assets/icon.png'
import DesktopHomeSectionArrivedJustNow from './Components/DesktopHomeSectionArrivedJustNow';
import DesktopHomeDealsDection2 from './Components/DesktopHomeDealsDection2';

const DesktopHomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', elevation: 3, height: 70 }}>
        <Image source={logo} style={{ width: 64, height: 64, marginLeft: 5 }} />
      </View>
      
      <TopDesktopCarousel/>

      <DesktopHomeSectionArrivedJustNow/>
      <DesktopHomeDealsDection2/>
      
      {/* Rest of your content goes here */}
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
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

export default DesktopHomeScreen;
