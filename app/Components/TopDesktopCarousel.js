import React, { useEffect, useState } from 'react';
import { View, Image, Dimensions, TouchableOpacity, Text } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { getDocs, query, collection, limit } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const TopDesktopCarousel = () => {
  const [carouselImages, setCarouselImages] = useState([]);
  const deviceWidth = Dimensions.get('window').width;

  useEffect(() => {
    const fetchTopCarouselImages = async () => {
      try {
        const fetchHomeCarouselImagesQuery = query(collection(db, 'DesktopHomeCarouselImages'), limit(3));
        const homeCarouselQuerySnapshot = await getDocs(fetchHomeCarouselImagesQuery);

        const fetchedImages = homeCarouselQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
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
  };

  return (
    <View style={{ height: 'auto', maxHeight: deviceWidth * 0.7,backgroundColor:'#d4d4d4'}}>
      <SwiperFlatList
        autoplay
        autoplayDelay={4}
        autoplayLoop
        index={0}
        showPagination
        paginationStyleItem={{ width: 10, height: 6, borderRadius: 4, margin: 5 }}
        paginationStyleItemInactive={{ backgroundColor: 'lightgray', opacity: 1 }}
        style={{ height: deviceWidth*.2}}
      >
        {carouselImages.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => handleCategoryClick(item.Tags)}>
            <View style={{ width: deviceWidth, height:deviceWidth*.2 }}>
              <Image
                source={{ uri: item.url }}
                style={{
                  width: deviceWidth,
                  height: deviceWidth*.2, // Adjust this value as needed
                }}
                resizeMode='contain'
              />
            </View>
          </TouchableOpacity>
        ))}
      </SwiperFlatList>
    </View>
  );
};

export default TopDesktopCarousel;
