// HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import { ActivityIndicator, Appbar } from 'react-native-paper';
import ValueStore from '../Components/ValueStore';
import PercentageCardsList from '../Components/PercentageCardsList';
import CategoriesSection from '../Components/CategoriesSection';
import PriceCards from '../Components/PriceCards';
import ArrivedJustNow from '../Components/ArrivedJustNow';
import TopHomeCarousel from '../Components/TopHomeCarousel';
import MadeWithLove from '../Components/MadeWithLove';
import ScrollableCards1 from '../Components/ScrollableCards1';
import BottomHomeCarousel from '../Components/BottomHomeCarousel';
import { router } from 'expo-router';
import logo from '..//..//assets/icon.png'; // Replace with the correct path

const cardsData1 = [
  { image: 'https://firebasestorage.googleapis.com/v0/b/smartsaver-ace3e.appspot.com/o/sample%202-09%20(1).png?alt=media&token=847953b0-2fe6-4297-a3c6-b73be0616a2d', tags: ['beauty', 'beauty & personal care', 'facewash', 'sunscreen', 'face serum', 'faceserum', 'serum', 'moisturizer', 'moituriser', 'hair care', 'hairwash', 'shampoo', 'hairserum', 'makeup', 'perfumes', 'perfume', 'fragrance', 'deo']},
  { image: 'https://firebasestorage.googleapis.com/v0/b/smartsaver-ace3e.appspot.com/o/sample%202-12%20(1).png?alt=media&token=51a43316-7273-43c8-8ae0-6548c7c288cb', tags: ['footwear','casual shoes', 'casualshoes', 'sports shoes', 'sportsshoes', 'formal shoes', 'formalshoes', 'flip flops', 'flipflops', 'heels'] },
  { image: 'https://firebasestorage.googleapis.com/v0/b/smartsaver-ace3e.appspot.com/o/sample%202-11%20(1).png?alt=media&token=dc56ca71-3815-4c50-99dd-13be3a04e1f1', tags: ['beauty', 'beauty & personal care', 'facewash', 'sunscreen', 'face serum', 'faceserum', 'serum', 'moisturizer', 'moituriser', 'hair care', 'hairwash', 'shampoo', 'hairserum', 'makeup', 'perfumes', 'perfume', 'fragrance', 'deo', 'women\'s fashion', 'shirts & t-shirts', 'womenshirt', 'womentshirt', 'womenshirts', 'jeans & trousers', 'womenjeans', 'womentrouser', 'women ethnic wear', 'womenethnicwear', 'sarees', 'saree', 'lehenga', 'winter wear', 'womenwinterwear', 'watches', 'womenwatch', 'smartwatch', 'accessories', 'womenaccessories', 'backpack', 'bags', 'men\'s fashion', 'shirts & t-shirts', 'menshirt', 'mentshirt', 't-shirt', 'jeans & trousers', 'men jeans', 'men\'s jeans', 'ethnic wear', 'menethnicwear', 'winter wear', 'menwinterwear', 'watches', 'menwatch', 'smartwatch', 'accessories', 'menaccessories', 'backpack', 'bags']},
  { image: 'https://firebasestorage.googleapis.com/v0/b/smartsaver-ace3e.appspot.com/o/sample%202-10%20(1).png?alt=media&token=0bbd9921-a2a1-4e13-bb17-edc89cf39a1b', tags: ['haircare','hair care', 'hairwash', 'shampoo', 'hairserum'] },
  // Add more cards as needed
];

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating a delay for 1 second
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Clear the timeout in case the component unmounts before 1 second
    return () => clearTimeout(timer);
  }, []);

  const handleIconClick = () => {
    console.log('Icon clicked!');
    //router.push('Screens/Login');
  };


  const icon = require('..//..//assets/icon.png');


  return (
    <View style={styles.container}>

    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', elevation: 3, height: 70 }}>
      <Image source={logo} style={{ width: 64, height: 64, marginLeft: 5 }} />
    </View>

    

      {isLoading ? (
        <ActivityIndicator
          style={styles.loadingIndicator}
          animating={true}
          color={'#000'} // Set your desired color
          size={'medium'} // Adjust the size as needed
        />
      ) : (
        <FlatList
          data={cardsData1}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
          style={{backgroundColor:'#f5f5f5'}}
          ListHeaderComponent={
            <>
              <TopHomeCarousel />
              <CategoriesSection />
              <ArrivedJustNow />
              <BottomHomeCarousel />
              <PercentageCardsList />
              <ValueStore />
              <PriceCards />
              <ScrollableCards1 cardsData={cardsData1} />
              <MadeWithLove />
            </>
          }
          
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  cardImage: {
    width: '100%',
    height: 200, // adjust the height as needed
    resizeMode: 'cover',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
