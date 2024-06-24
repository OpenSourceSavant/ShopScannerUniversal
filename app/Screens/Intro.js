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
      title: 'Welcome to MyApp!',
      text: 'Description.\nSay something cool',
      image: require('../../assets/splash.png'),
      backgroundColor: '#59b2ab',
    },
    {
      key: '2',
      title: 'Explore Features',
      text: 'Other cool stuff',
      image: require('../../assets/splash.png'),
      backgroundColor: '#febe29',
    },
    {
      key: '3',
      title: 'Get Started',
      text: 'Lorem ipsum bla bla bla',
      image: require('../../assets/splash.png'),
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
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 40,
  },
});

export default Intro;
