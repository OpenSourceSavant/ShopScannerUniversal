import React, { useEffect, useState } from 'react';
import { View, Image, Dimensions,TouchableOpacity } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { getDocs, query, collection, limit } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { router } from 'expo-router';

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

  const handleCategoryClick = (tags) => {
    console.log('Category clicked with tags:', tags);
    router.push('/Screens/DealsList');
  };

  return (
    <View style={{ height: deviceWidth * 0.6 }}>
      <SwiperFlatList
        autoplay
        autoplayDelay={3}
        autoplayLoop
        index={0}
        showPagination
      >
        {carouselImages.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => handleCategoryClick(item.tags)}>

          <View key={index} style={{ width: deviceWidth, height: deviceWidth * 0.6 }}>
            <Image
              source={{ uri: item.url }}
              style={{
                width: deviceWidth,
                height: deviceWidth * 0.65,
                resizeMode: 'contain',
              }}
            />
          </View>
          </TouchableOpacity>
        ))}
      </SwiperFlatList>
    </View>
  );
};

export default TopHomeCarousel;
