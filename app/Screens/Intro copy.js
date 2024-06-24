import React, { useState, useRef } from 'react';
import { View, Image, Dimensions, TouchableOpacity, StyleSheet, Text, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const images = [
  require('..//..//assets/splash.png'),
  require('..//..//assets/about.jpg'),
  require('..//..//assets/about.jpg'),
];

const Intro = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSkip = () => {
    // Handle skipping the intro, maybe navigate to the next screen
  };

  const handleFinish = () => {
    // Handle finishing the intro, maybe navigate to the next screen
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" hidden />
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image
            source={item}
            style={[styles.backgroundImage, { width: Dimensions.get('window').width }]}
          />
        )}
        onMomentumScrollEnd={(event) => {
          const width = Dimensions.get('window').width;
          setCurrentIndex(Math.floor(event.nativeEvent.contentOffset.x / width));
        }}
      />
      
      <View style={styles.overlay}>
      <View style={styles.dotsContainer}>
          {images.map((_, index) => (
            <View key={index} style={[styles.dot, index === currentIndex ? styles.activeDot : null]} />
          ))}
        </View>
        <Text style={styles.title}>Welcome to Airbnb</Text>
        <Text style={styles.subtitle}>Find unique places to stay and things to do around the world</Text>
        <View style={styles.buttonsContainer}>
          {currentIndex < images.length - 1 ? (
            <TouchableOpacity style={styles.button} onPress={handleSkip}>
              <Text style={styles.buttonText}>Skip</Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>{currentIndex < images.length - 1 ? 'Next' : 'Finish'}</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  backgroundImage: {
    height: Dimensions.get('window').height * 0.8,
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#333',
  },
});

export default Intro;
