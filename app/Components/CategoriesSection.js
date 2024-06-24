import React,{useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import top_categories_banner from '..//..//assets/top_categories_banner.png';
import setupGoogleAnalytics from '../analytics';

if (Platform.OS === 'android' ||Platform.OS === 'ios') {
  FastImage = require('react-native-fast-image');
}
const isAndroid = Platform.OS === 'android';
let analytics;

const categories = [
  { id: '2', name: 'Hot', image: require('..//..//assets/latest.png'), tags: ["morethan60"] },
  { id: '1', name: 'Latest', image: require('..//..//assets/hot.png'), tags: null },
  { id: '8', name: 'Beauty', image: require('..//..//assets/beauty.png'), tags: [
      "beauty&personalcare", "shower gel", "menfragrance", "facewash", "sunscreen", "faceserum", 
      "moituriser", "haircare", "hairwash", "shampoo", "hairserum", "makeup", "perfumes", "perfume", 
      "fragrance", "deo", "beauty"
    ] },
  { id: '4', name: 'Men\'s Fashion', image: require('..//..//assets/menfashion.png'), 
    tags: [
      "men'sfashion", "men's fashion", "shirts&t-shirts", "menshirt", "mentshirt", "t-shirt", 
      "jeans&trousers", "menjeans", "men'sjeans", "ethnicwear", "menethnicwear", "winterwear", 
      "menwinterwear", "watches", "menwatch", "smartwatch", "accessories", "menaccessories", 
      "backpack", "bags"
    ] },
  { id: '6', name: 'Women\'s Fashion', image: require('..//..//assets/womenfashion.png'), 
    tags: [
      "womenfashion", "women's fashion", "shirts&t-shirts", "womenshirt", "womentshirt", "womenshirts", 
      "jeans&trousers", "womenjeans", "womentrouser", "ethnicwear", "sarees", "saree", "winterwear", 
      "womenwinterwear", "watches", "womenwatch", "smartwatch"
    ] },
  { id: '3', name: 'Gadgets', image: require('..//..//assets/gadgets.png'), tags: [
      "electronics&gadgets", "electronics", "mobiles", "phone", "phones", "smartphone", "laptops", 
      "cameras", "earphones", "headphones", "televisions", "tv", "airconditioners", "ac", "others"
    ] },
  { id: '7', name: 'Home', image: require('..//..//assets/home.png'), tags: [
      "home improvement", "kitchenware", "kitchen ware", "homedecor", "home decor", "furnishing", 
      "appliances", "ac", "tv", "television", "refrigerator", "fridge", "bathroomaccessories", 
      "bathroom", "outdoorandgarden", "outdoor", "garden", "diytools"
    ] },
  { id: '10', name: 'See All', image: require('..//..//assets/seeall.png'), tags: ['all'] },
];

const handleCategoryClick = (category, navigation,_analytics) => {
  console.log(category.tags);
  if (analytics)
    {
      let category_name_for_logging;
      category_name_for_logging = category.name.replace(/[' ]/g, '') + '_home';
      console.log(category_name_for_logging)
      analytics.logEvent(category_name_for_logging)
    }
  
  navigation.navigate('Screens/DealsList', { tags: category.tags,lastRoute:'HomeScreen' });
};

const CategoriesSection = () => {
  const navigation = useNavigation();


  useEffect(() => {
    const initializeAnalytics = async () => {
       analytics = await setupGoogleAnalytics();
      // Now you can use 'analytics' to log events or retrieve analytics data
    };

    initializeAnalytics();
  }, []);

  return (
    <View style={styles.container}>
      
    


      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryCard}
            onPress={() => handleCategoryClick(category, navigation,analytics)}
          >
            {isAndroid || Platform.OS === 'ios' ? (
              <FastImage source={category.image} style={styles.categoryImage} resizeMode={FastImage.resizeMode.cover} />
            ) : (
              <Image source={category.image} style={styles.categoryImage} resizeMode="cover" />
            )}
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginLeft:10,
    marginRight:10
  },
  categoryCard: {
    width: '24%', // Adjust width as needed based on your design
    alignItems: 'center',
    marginBottom: 1,
  },
  categoryImage: {
    height: 100,
    width: 90,
    borderRadius: 50, // Half of the width and height to make it circular
    overflow: 'hidden',
  },
  categoryText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '300',
    color: '#222',
    fontFamily: 'Roboto',
    
    ...(isAndroid && {
      fontWeight: '200',
      color: '#36454F',
    }),
  },
  title: {
    fontFamily: 'Roboto',
    paddingBottom: 5,
    fontWeight: '500',
    textAlign: 'center',
    
    color:'#36454F',
    
    fontSize:18
  },
});

export default CategoriesSection;
