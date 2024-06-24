import React from 'react';
import { View, ScrollView, Image, Dimensions, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Import your logos here
import AmazonLogo from '..//..//assets/amazon_logo.png';
import MyntraLogo from '..//..//assets/myntra_logo.png';
import NykaaLogo from '..//..//assets/nykaa_logo.png';
import AjioLogo from '..//..//assets/ajio_logo.png';

const ChooseByStore = () => {
  const deviceWidth = Dimensions.get('window').width;
  const logos = [
    AmazonLogo,
    MyntraLogo,
    NykaaLogo,
    AjioLogo
  ];

  const renderLogoItem = (item, index) => (
    <TouchableOpacity key={index} style={styles.logoContainer}>
      <LinearGradient
        colors={['#ECB5CF', '#F9E4E7']}
        style={styles.gradient}
      >
        <Image source={item} style={styles.logo} />
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>------------------ Explore deals by store -----------------</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContainer}>
        {logos.map((logo, index) => renderLogoItem(logo, index))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  scrollViewContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
    height:267
  },
  logoContainer: {
    marginRight: 10,
    borderRadius: 10,
    borderColor: '#ECB5CF',
    height:240,
    width:150,
    borderWidth: 0.4,
    overflow: 'hidden',
    marginTop:25 // Ensure that the overflow is hidden to clip the LinearGradient
  },
  gradient: {
    width: 150,
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 110,
    height: 80,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: 'Roboto',
    paddingBottom: 5,
    fontWeight: '500',
    textAlign: 'center',
    fontSize:17,
    marginLeft: 15,

  },
});

export default ChooseByStore;
