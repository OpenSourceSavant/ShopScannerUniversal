import React, { useEffect, useState } from 'react';
import { View, ScrollView, Dimensions, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { getDocs, query, collection, limit } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { router } from 'expo-router';
import { ActivityIndicator } from 'react-native-paper';

let FastImage;
if (Platform.OS === 'android' || Platform.OS === 'ios') {
  FastImage = require('react-native-fast-image');
}

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
    router.push({ pathname: 'Screens/DealsList', params: { tags: Tags,lastRoute:'HomeScreen' } });
  };

  return (
    <View style={{ flex: 1, height: 230,backgroundColor:'#fff' }}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ marginLeft:10,marginRight:10 }}
        contentContainerStyle={{ alignItems: 'center' }}
      >
        {carouselImages.length > 0 ? (
          carouselImages.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleCarouselClick(item.Tags)}
              style={{ borderRadius:10 }}
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
          <ActivityIndicator animating={true} size="large" />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    
  },
  image: {
    width: Dimensions.get('window').width-20,
    height: 230,
    borderRadius: 10,
    
  },
});

export default TopHomeCarousel;
