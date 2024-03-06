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
    router.push({ pathname: 'Screens/DealsList', params: { tags: tags } })    
  };

  return (
    <View style={{ height: deviceWidth * 0.7,marginTop:20}}>
    <Text style={{   fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        paddingBottom: 5,
        fontWeight: '700',
        textAlign: 'left',
        marginLeft:10,
        marginBottom:5 }}>
  </Text>
      <SwiperFlatList
        autoplay
        autoplayDelay={4}
        autoplayLoop
        index={0}
        showPagination
        paginationStyleItem={{ width: 10, height: 6, borderRadius: 4, margin:5 }} // Style object for the item (dot)
        paginationStyleItemInactive={{ backgroundColor: 'lightgray',opacity:1 }} // Style object for the inactive item (dot)

        style={{height: deviceWidth * 0.67 }}
      >
        {carouselImages.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => handleCategoryClick(item.Tags)}>

          <View key={index} style={{ width: deviceWidth, height: deviceWidth * 0.67 }}>
            <Image
              source={{ uri: item.url }}
              style={{
                width: deviceWidth,
                height: deviceWidth * 0.68,
                
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

export default BottomHomeCarousel;
