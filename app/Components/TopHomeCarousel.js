import React, { useEffect, useState } from 'react';
import { View, Image, Dimensions,TouchableOpacity } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { getDocs, query, collection, limit } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { Link,router } from 'expo-router';
import FastImage from 'react-native-fast-image'

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
    router.push({ pathname: 'Screens/DealsList', params: { tags: Tags } })    

  };

  const renderPaginationItem = (item, index) => {
    return (
      <TouchableOpacity
        key={index}
        style={{
          width: 4,
          height: 4,
          margin: 3,
          borderRadius: 4,
          backgroundColor: index === 0 ? 'blue' : 'lightgray', // Customize the color here
          
        }}
      />
    );
  };

  return (
    <View style={{ height: deviceWidth * 0.6 }}>
      <SwiperFlatList
        autoplay
        autoplayDelay={4}
        autoplayLoop
        index={0}
        showPagination
        paginationStyleItem={{ width: 10, height: 6, borderRadius: 4, margin: 5 }} // Style object for the item (dot)
        paginationStyleItemInactive={{ backgroundColor: 'lightgray',opacity:1 }} // Style object for the inactive item (dot)


      >
        {carouselImages.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => handleCarouselClick(item.Tags)}>

          <View key={index} style={{ width: deviceWidth, height: deviceWidth * 0.6 }}>
            <FastImage
              source={{ uri: item.url }}
              style={{
                width: deviceWidth,
                height: deviceWidth * 0.65,
              }}
              resizeMode={FastImage.resizeMode.contain}
              
            />
          </View>
          </TouchableOpacity>
        ))}
      </SwiperFlatList>
    </View>
  );
};

export default TopHomeCarousel;
