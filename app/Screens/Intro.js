import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams,router } from 'expo-router';


const { width, height } = Dimensions.get('window');

const Intro = () => {
  const navigation = useNavigation();

  const slides = [
    {
      key: '1',
      title: 'Welcome to\nShopScanner!',
      text: 'Description.\nSay something cool',
      image: require('../../assets/illuss11.png'),
      backgroundColor: '#59b2ab',
    },
    {
      key: '2',
      title: 'Explore Features',
      text: 'Other cool stuff',
      image: require('../../assets/illus22.png'),
      backgroundColor: '#febe29',
    },
    {
      key: '3',
      title: 'Get Started',
      text: 'Lorem ipsum bla bla bla',
      image: require('../../assets/illus3.png'),
      backgroundColor: '#22bcb5',
    },
  ];

  const _renderItem = ({ item }) => {
    return (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const _onDone = () => {
    // User finished the intro slides. Navigate to MainStack.
    router.replace({ pathname: 'MobileStack', params: { lastRoute: 'Intro' } });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <AppIntroSlider renderItem={_renderItem} data={slides} onDone={_onDone} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
    marginRight:10,
    marginLeft:10
  },
  text: {
    fontSize: 21,
    color: 'white',
    textAlign: 'center',
  },
  image: {
    width: 240,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 60,
    marginTop:60
  },
});

export default Intro;
