import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, FlatList, Image, RefreshControl, Platform, TouchableOpacity, TextInput, Text, Animated } from 'react-native';
import { ActivityIndicator, Appbar } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'; // Import FastImage
import logo from '..//..//assets/icon.png';
import notification from '..//..//assets/notification.png';
import search_icon from '..//..//assets/search_icon.png';
import * as StoreReview from 'expo-store-review';
import ChooseByStore from '../Components/ChooseByStore';
import ValueStore from '../Components/ValueStore';
import PercentageCardsList from '../Components/PercentageCardsList';
import CategoriesSection from '../Components/CategoriesSection';
import PriceCards from '../Components/PriceCards';
import ArrivedJustNow from '../Components/ArrivedJustNow';
import TopHomeCarousel from '../Components/TopHomeCarousel';
import MadeWithLove from '../Components/MadeWithLove';
import ScrollableCards1 from '../Components/ScrollableCards1';
import BottomHomeCarousel from '../Components/BottomHomeCarousel';
import setupGoogleAnalytics from '../analytics';
import { useLocalSearchParams,router } from 'expo-router';

// Sample data for different types of views
const viewsData = [
  { type: 'TopHomeCarousel' },
  { type: 'CategoriesSection' },
  { type: 'ArrivedJustNow' },
  { type: 'ChooseByStore' },
  { type: 'BottomHomeCarousel' },
  { type: 'PercentageCardsList' },
  { type: 'ValueStore' },
  { type: 'PriceCards' },
  { type: 'ScrollableCards1' },
  { type: 'MadeWithLove' },
];

const cardsData1 = [
  { image: 'https://firebasestorage.googleapis.com/v0/b/smartsaver-ace3e.appspot.com/o/sample%202-09%20(1).png?alt=media&token=847953b0-2fe6-4297-a3c6-b73be0616a2d', tags: ['beauty', 'beauty & personal care', 'facewash', 'sunscreen', 'face serum', 'faceserum', 'serum', 'moisturizer', 'moituriser', 'hair care', 'hairwash', 'shampoo', 'hairserum', 'makeup', 'perfumes', 'perfume', 'fragrance', 'deo']},
  { image: 'https://firebasestorage.googleapis.com/v0/b/smartsaver-ace3e.appspot.com/o/sample%202-12%20(1).png?alt=media&token=51a43316-7273-43c8-8ae0-6548c7c288cb', tags: ['footwear','casual shoes', 'casualshoes', 'sports shoes', 'sportsshoes', 'formal shoes', 'formalshoes', 'flip flops', 'flipflops', 'heels'] },
  { image: 'https://firebasestorage.googleapis.com/v0/b/smartsaver-ace3e.appspot.com/o/sample%202-11%20(1).png?alt=media&token=dc56ca71-3815-4c50-99dd-13be3a04e1f1', tags: ['beauty', 'beauty & personal care', 'facewash', 'sunscreen', 'face serum', 'faceserum', 'serum', 'moisturizer', 'moituriser', 'hair care', 'hairwash', 'shampoo', 'hairserum', 'makeup', 'perfumes', 'perfume', 'fragrance', 'deo', 'women\'s fashion', 'shirts & t-shirts', 'womenshirt', 'womentshirt', 'womenshirts', 'jeans & trousers', 'womenjeans', 'womentrouser', 'women ethnic wear', 'womenethnicwear', 'sarees', 'saree', 'lehenga', 'winter wear', 'womenwinterwear', 'watches', 'womenwatch', 'smartwatch', 'accessories', 'womenaccessories', 'backpack', 'bags', 'men\'s fashion', 'shirts & t-shirts', 'menshirt', 'mentshirt', 't-shirt', 'jeans & trousers', 'men jeans', 'men\'s jeans', 'ethnic wear', 'menethnicwear', 'winter wear', 'menwinterwear', 'watches', 'menwatch', 'smartwatch', 'accessories', 'menaccessories', 'backpack', 'bags']},
  { image: 'https://firebasestorage.googleapis.com/v0/b/smartsaver-ace3e.appspot.com/o/sample%202-10%20(1).png?alt=media&token=0bbd9921-a2a1-4e13-bb17-edc89cf39a1b', tags: ['haircare','hair care', 'hairwash', 'shampoo', 'hairserum'] },
  // Add more cards as needed
];

// Placeholder texts for search input
const placeholderTexts = ["Search for Products", "Search for Lipstick", "Search for Shoes", "Search for your favourite brand"];

const HomeScreen = ({ route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [opacityAnimation] = useState(new Animated.Value(1));
  const [randomLoaderText, setRandomLoaderText] = useState('');
  const [lastClickedIndex, setLastClickedIndex] = useState(null);
  const navigation = useNavigation();

  //const lastRoute = useLocalSearchParams().lastRoute;

  const { lastRoute } = route.params;

  const flatListRef = useRef(null);

  useEffect(() => {
    // Simulate loading with a timeout
    if (lastRoute=='Splash'){
      setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }
  else{
    setIsLoading(false)
  }
  }, [lastRoute]);

  useEffect(() => {
    const initializeAnalytics = async () => {
      const analytics = await setupGoogleAnalytics();
      // Now you can use 'analytics' to log events or retrieve analytics data
      analytics.logEvent('home_screen_android')
    };

    initializeAnalytics();
  }, []);

  useEffect(() => {
    // Animate placeholder text
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
        setCurrentPlaceholderIndex((prevIndex) =>
          prevIndex === placeholderTexts.length - 1 ? 0 : prevIndex + 1
        );
      });
    };

    const intervalId = setInterval(animatePlaceholder, 2000); // Start animation interval

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [opacityAnimation]);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const navigateToSearchScreen = () => {
    router.push('Screens/SearchScreen'); // Navigate to SearchScreen
  };

  const handleItemClick = (type) => {
    console.log('Handling item click for type:', type);
    // Log the name of the component clicked based on its type
    switch (type) {
      case 'TopHomeCarousel':
        console.log('TopHomeCarousel clicked');
        break;
      case 'CategoriesSection':
        console.log('CategoriesSection clicked');
        break;
      case 'ChooseByStore':
        console.log('ChooseByStore clicked');
        break;
      case 'BottomHomeCarousel':
        console.log('BottomHomeCarousel clicked');
        break;
      case 'PercentageCardsList':
        console.log('PercentageCardsList clicked');
        break;
      case 'ValueStore':
        console.log('ValueStore clicked');
        break;
      case 'PriceCards':
        console.log('PriceCards clicked');
        break;
      case 'ScrollableCards1':
        console.log('ScrollableCards1 clicked');
        break;
      case 'MadeWithLove':
        console.log('MadeWithLove clicked');
        break;
      default:
        break;
    }
  };

  const handleNotificationClick = () => {
    // Perform your action here
    router.push('Screens/NotificationScreen')
  };

  const renderItem = ({ item, index }) => {

    const Component = {
      'TopHomeCarousel': <TopHomeCarousel  />,
      'CategoriesSection': <CategoriesSection  />,
      'ChooseByStore': <ChooseByStore  />,
      'ArrivedJustNow': <ArrivedJustNow  />,
      'BottomHomeCarousel': <BottomHomeCarousel  />,
      'PercentageCardsList': <PercentageCardsList  />,
      'ValueStore': <ValueStore  />,
      'PriceCards': <PriceCards  />,
      'ScrollableCards1': <ScrollableCards1  cardsData={cardsData1} />,
      'MadeWithLove': <MadeWithLove  />,
    }[item.type];

    return (
       <TouchableOpacity onPress={() => console.log(`Handling item click for type: ${item.type}`)} style={styles.touchable}>
        {Component}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator animating={true} color={'#d53b62'} />
          <Text style={{ marginTop: 15, color: '#555555', fontSize: 16, paddingLeft: 30, paddingRight: 30, textAlign: 'center' }}>{randomLoaderText}</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor='#fff' />
          <Appbar.Header style={{ height: 40, marginTop: -15,backgroundColor:'#fff' }}>
            <Image source={logo} style={{ width: 55, height: 55, marginLeft: 10 }} />
            <View style={{ flex: 1 }}></View>
            <TouchableOpacity onPress={handleNotificationClick}>
              <Image source={notification} style={{ width: 28, height: 28, marginRight: 10 }} />
            </TouchableOpacity>

          </Appbar.Header>



          <View style={{ backgroundColor: "#fff" }}>
            <View style={styles.inputContainer}>
              {((Platform.OS === 'android' || Platform.OS === 'ios')) ? (
                <FastImage source={search_icon} style={{ width: 24, height: 24, marginLeft: 5 }} />
              ) : (
                <Image source={search_icon} style={{ width: 66, height: 66, marginLeft: 5 }} resizeMode="cover" />
              )}
              <TextInput
                style={styles.input}
                placeholderTextColor="#222"
                onFocus={navigateToSearchScreen}
                placeholder={placeholderTexts[currentPlaceholderIndex]}
              />
            </View>
          </View>
          <FlatList
            data={viewsData}
            ref={flatListRef}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            refreshControl={Platform.OS !== 'web' && <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            initialScrollIndex={0}
            style={{ backgroundColor: '#fff' }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    margin: 10,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 25,
    height: 50,
    padding: 5,
    backgroundColor: '#fff'
  },
  input: {
    height: 30,
    flex: 1,
    color: '#d3d3d3',
    marginLeft: 15
  },
  touchable: {
    marginBottom: 10, // Adjust as needed for spacing between items
  },
});

export default HomeScreen;
