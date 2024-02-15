import React, { useEffect, useState } from 'react';
import { View, Image, Dimensions,TouchableOpacity,Text } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { getDocs, query, collection, limit } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { Link,router } from 'expo-router';

const BottomHomeCarousel = () => {
  const [carouselImages, setCarouselImages] = useState([]);
  const deviceWidth = Dimensions.get('window').width;

  useEffect(() => {
    const fetchTopCarouselImages = async () => {
      try {
        const fetchHomeCarouselImagesQuery = query(collection(db, 'HomeBottomCarouselImages'), limit(8));
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
    router.push('Screens/DealsList')
  };

  return (
    <View style={{padding:10,backgroundColor:'#f5f5f5' }}>
    <Text style={{   fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    paddingTop:10,
    paddingBottom:20,    
    fontWeight: '700',
    textAlign: 'left', }}>
    BEST OF STORES
  </Text>
      <SwiperFlatList
        autoplay
        autoplayDelay={4}
        autoplayLoop
        index={0}
        showPagination
        paginationStyleItem={{ width: 10, height: 6, borderRadius: 4, margin: 5 }} // Style object for the item (dot)
        paginationStyleItemInactive={{ backgroundColor: 'lightgray',opacity:1 }} // Style object for the inactive item (dot)

        style={{height: deviceWidth * 0.67 }}
      >
        {carouselImages.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => handleCategoryClick(item.tags)}>

          <View key={index} style={{ width: deviceWidth, height: deviceWidth * 0.67 }}>
            <Image
              source={{ uri: item.url }}
              style={{
                width: deviceWidth,
                height: deviceWidth * 0.67,
                
              }}
              resizeMode='cover'

            />
          </View>
          </TouchableOpacity>
        ))}
      </SwiperFlatList>
    </View>
  );
};

export default BottomHomeCarousel;
