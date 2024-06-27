import React from 'react';
import { View, ScrollView, Image, Dimensions, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams,router } from 'expo-router';

// Import your logos here
import AmazonLogo from '..//..//assets/amazon_logo.png';
import MyntraLogo from '..//..//assets/myntra_logo.png';
import NykaaLogo from '..//..//assets/nykaa_logo.png';
import AjioLogo from '..//..//assets/ajio_logo.png';

const ChooseByStore = () => {
  const deviceWidth = Dimensions.get('window').width;
  const logos = [
    { source: AmazonLogo, tag: 'amazon' },
    { source: MyntraLogo, tag: 'myntra' },
    { source: NykaaLogo, tag: 'nykaa' },
   // { source: AjioLogo, tag: 'ajio' }
  ];

  const renderLogoItem = (item, index) => (
    <TouchableOpacity key={index} style={styles.logoContainer}
    onPress={() => router.push({ pathname: 'Screens/DealsList', params: { tags: item.tag, lastRoute: 'HomeScreen' } })}>
      <LinearGradient
        colors={['#ECB5CF', '#F9E4E7']}
        style={styles.gradient}
      >
        <Image source={item.source} style={styles.logo} />
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.lineContainer}>
            <LinearGradient
                      colors={['#e0e0e0', '#000']}
                      style={styles.line}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}/>
            <Text style={styles.title}>Explore deals by store</Text>
            <LinearGradient
                        colors={['#000', '#e0e0e0']}
                        style={styles.line}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}/>
      </View>
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
    paddingLeft:15,
    paddingRight:15,
    paddingTop:5,
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 14,
    color: '#e91e63', // Pink theme color
    textTransform: 'uppercase', // Modern style
    letterSpacing: 1.2, // Adds spacing between letters for a modern look
    backgroundColor: 'rgba(233, 30, 99, 0.1)', // Light pink background to highlight the title
    paddingVertical: 10, // Add vertical padding for better readability
    borderRadius: 8, // Slightly rounded corners
    overflow: 'hidden', // Ensure rounded corners are clipped
  },  
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#000',
    marginLeft:10,
    marginRight:10
    
  },
});

export default ChooseByStore;
