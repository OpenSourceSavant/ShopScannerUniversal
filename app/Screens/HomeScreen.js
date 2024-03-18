import React, { useEffect, useState,useRef } from 'react';
import { View, StyleSheet, FlatList, Image, RefreshControl, Platform, TouchableOpacity,TextInput,Text,Animated } from 'react-native';
import { ActivityIndicator, Appbar } from 'react-native-paper'; // Import TextInput from react-native-paper
import ValueStore from '../Components/ValueStore';
import PercentageCardsList from '../Components/PercentageCardsList';
import CategoriesSection from '../Components/CategoriesSection';
import PriceCards from '../Components/PriceCards';
import ArrivedJustNow from '../Components/ArrivedJustNow';
import TopHomeCarousel from '../Components/TopHomeCarousel';
import MadeWithLove from '../Components/MadeWithLove';
import ScrollableCards1 from '../Components/ScrollableCards1';
import BottomHomeCarousel from '../Components/BottomHomeCarousel';
import logo from '..//..//assets/icon.png'; // Replace with the correct path
import search_icon from '..//..//assets/search_icon.png'; // Replace with the correct path
import { StatusBar } from 'expo-status-bar';
import { Link,router,useNavigation } from 'expo-router';

const cardsData1 = [
  { image: 'https://firebasestorage.googleapis.com/v0/b/smartsaver-ace3e.appspot.com/o/sample%202-09%20(1).png?alt=media&token=847953b0-2fe6-4297-a3c6-b73be0616a2d', tags: ['beauty', 'beauty & personal care', 'facewash', 'sunscreen', 'face serum', 'faceserum', 'serum', 'moisturizer', 'moituriser', 'hair care', 'hairwash', 'shampoo', 'hairserum', 'makeup', 'perfumes', 'perfume', 'fragrance', 'deo']},
  { image: 'https://firebasestorage.googleapis.com/v0/b/smartsaver-ace3e.appspot.com/o/sample%202-12%20(1).png?alt=media&token=51a43316-7273-43c8-8ae0-6548c7c288cb', tags: ['footwear','casual shoes', 'casualshoes', 'sports shoes', 'sportsshoes', 'formal shoes', 'formalshoes', 'flip flops', 'flipflops', 'heels'] },
  { image: 'https://firebasestorage.googleapis.com/v0/b/smartsaver-ace3e.appspot.com/o/sample%202-11%20(1).png?alt=media&token=dc56ca71-3815-4c50-99dd-13be3a04e1f1', tags: ['beauty', 'beauty & personal care', 'facewash', 'sunscreen', 'face serum', 'faceserum', 'serum', 'moisturizer', 'moituriser', 'hair care', 'hairwash', 'shampoo', 'hairserum', 'makeup', 'perfumes', 'perfume', 'fragrance', 'deo', 'women\'s fashion', 'shirts & t-shirts', 'womenshirt', 'womentshirt', 'womenshirts', 'jeans & trousers', 'womenjeans', 'womentrouser', 'women ethnic wear', 'womenethnicwear', 'sarees', 'saree', 'lehenga', 'winter wear', 'womenwinterwear', 'watches', 'womenwatch', 'smartwatch', 'accessories', 'womenaccessories', 'backpack', 'bags', 'men\'s fashion', 'shirts & t-shirts', 'menshirt', 'mentshirt', 't-shirt', 'jeans & trousers', 'men jeans', 'men\'s jeans', 'ethnic wear', 'menethnicwear', 'winter wear', 'menwinterwear', 'watches', 'menwatch', 'smartwatch', 'accessories', 'menaccessories', 'backpack', 'bags']},
  { image: 'https://firebasestorage.googleapis.com/v0/b/smartsaver-ace3e.appspot.com/o/sample%202-10%20(1).png?alt=media&token=0bbd9921-a2a1-4e13-bb17-edc89cf39a1b', tags: ['haircare','hair care', 'hairwash', 'shampoo', 'hairserum'] },
  // Add more cards as needed
];

const placeholderTexts = ["Search for products", "Search for Lipstick", "Search for Shoes"]; // Array of placeholder texts

const HomeScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0); // Index to track the current placeholder text
  const [opacityAnimation] = useState(new Animated.Value(1)); // Initial opacity value for the animation

  const navigation = useNavigation();

  useEffect(() => {
    // Simulating a delay for 1 second
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Clear the timeout in case the component unmounts before 1 second
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Function to animate the placeholder text
    const animatePlaceholder = () => {
      Animated.sequence([
        Animated.timing(opacityAnimation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // After animation completes, move to the next placeholder text
        setCurrentPlaceholderIndex((prevIndex) =>
          prevIndex === placeholderTexts.length - 1 ? 0 : prevIndex + 1
        );
      });
    };

    // Call the animatePlaceholder function initially and set it to repeat
    const intervalId = setInterval(animatePlaceholder, 2000);

    // Clean up function to clear the interval
    return () => clearInterval(intervalId);
  }, [opacityAnimation, placeholderTexts]);



  const handleRefresh = () => {
    setRefreshing(true); // Set refreshing to true when refreshing starts
    setTimeout(() => {
      setRefreshing(false); // Set refreshing to false when refreshing ends
    }, 1000);
  };

  const navigateToSearchScreen = () => {
    navigation.dispatch(router.push('Screens/SearchScreen'));
  };

  return (
    <View style={styles.container}>
     

      {isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View >
              <ActivityIndicator animating={true} color={'#d53b62'} />
            </View>
            <Text style={{ marginTop: 15, color: '#555555', fontSize: 16,paddingLeft:30,paddingRight:30,textAlign:'center' }}>Discover savings, Shop Scanner awaits you!</Text>
        </View>
      ) : (
        <View style={{}}>
            <StatusBar backgroundColor='#fff' />
              <View style={{backgroundColor:'white'}}>
              <View style={{ backgroundColor: 'white', height: 70 }}>
                <Image source={logo} style={{ width: 64, height: 64, marginLeft: 5 }} />
              </View>
           
              <View style={styles.inputContainer}>
              <Image source={search_icon} style={{width:22,height:22,marginLeft:5}}/>  

                
              <TextInput
                    style={styles.input}
                    placeholderTextColor="#222"
                    onFocus={navigateToSearchScreen}
                    placeholder={placeholderTexts[currentPlaceholderIndex]}
                    />

            </View>
            </View>
          <FlatList
            data={cardsData1}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: '#f5f5f5',paddingTop:7,marginBottom:130 }}
            refreshControl={Platform.OS !== 'web' && <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}

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
        </View>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft:15,
    paddingRight:15,
    margin:10,
    borderColor:'#d3d3d3',
    borderWidth:1,
    borderRadius:25,
    padding:5,
    paddingLeft:10,
    backgroundColor:'white'

  },
  input: {
    height: 30,
    flex:1,
    color:'#d3d3d3',
    marginLeft:15
   
   
  },
  logo: {
    width: 54,
    height: 54,
    display:'none'
  },
});

export default HomeScreen;
