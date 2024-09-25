import React, { useEffect, useState } from 'react';
import { View, ScrollView, Dimensions, TouchableOpacity, Platform, StyleSheet, Animated, Text, Image } from 'react-native';
import { getDocs, query, collection, limit } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { router } from 'expo-router';

let FastImage;
if (Platform.OS === 'android' || Platform.OS === 'ios') {
  FastImage = require('react-native-fast-image');
}

const Loader = () => {
  const translateX = new Animated.Value(-100); // Initial position of the loader

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: 500, 
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: -100, 
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [translateX]);

  return (
    <View style={styles.loaderRectangleContainer}>
      <View style={styles.loaderRectangleLine}>
        <Animated.View style={[styles.loaderBar, { transform: [{ translateX }] }]} />
      </View>
    </View>
  );
};

const TopHomeCarousel = () => {
  const [carouselImages, setCarouselImages] = useState([]);
  const deviceWidth = Dimensions.get('window').width;

  useEffect(() => {
    const fetchTopCarouselImages = async () => {
      try {
        const fetchHomeCarouselImagesQuery = query(collection(db, 'HomeCarouselImages'), limit(8));
        const homeCarouselQuerySnapshot = await getDocs(fetchHomeCarouselImagesQuery);

        const fetchedImages = homeCarouselQuerySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCarouselImages(fetchedImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchTopCarouselImages();
  }, []);

  const handleCarouselClick = (Tags) => {
    console.log('Carousel clicked with tags:', Tags);
    router.push({ pathname: 'Screens/DealsList', params: { tags: Tags, lastRoute: 'HomeScreen',yRef:50 } });
  };

  return (
    <View style={{ flex: 1, height: 230, backgroundColor: '#fff' }}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ marginLeft: 10, marginRight: 10 }}
        contentContainerStyle={{ alignItems: 'center' }}
      >
        {carouselImages.length > 0 ? (
          carouselImages.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleCarouselClick(item.Tags)}
              style={{ borderRadius: 10 }}
            >
              <View style={styles.imageContainer}>
                {(Platform.OS === 'android' || Platform.OS === 'ios') ? (
                  <FastImage
                    source={{ uri: item.url }}
                    style={styles.image}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                ) : (
                  <Image
                    source={{ uri: item.url }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                )}
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View>
          <Loader />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 10,
    
  },
  image: {
    width: Dimensions.get('window').width - 20,
    height: 230,
    borderRadius: 10,
  },
  loaderRectangleContainer: {
    height: 230,
    width:Dimensions.get('window').width-20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius:10
  },
  loaderRectangleLine: {
    width: '100%',
    height: 230,
    backgroundColor: '#d3d3d3',
    overflow: 'hidden',
    position: 'relative',
  },
  loaderBar: {
    height: '100%',
    width: 500,
    backgroundColor: '#cfcfd0',
    position: 'absolute',
    left: 0,
    top: 0,
  },
});

export default TopHomeCarousel;
