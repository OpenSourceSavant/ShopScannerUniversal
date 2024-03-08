import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import { router, useNavigation } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const categories = [
  { id: '2', name: 'Hot', image: require('..//..//assets/hot.png'), "tags": ["morethan60"] },
  { id: '1', name: 'Latest', image: require('..//..//assets/latest.png'), tags: null },

  { id: '8', name: 'Beauty', image: require('..//..//assets/beauty.png'), "tags": [
    "beauty&personalcare",
    "shower gel",
    "menfragrance",
    "facewash",
    "sunscreen",
    "faceserum",
    "moituriser",
    "haircare",
    "hairwash",
    "shampoo",
    "hairserum",
    "makeup",
    "perfumes",
    "perfume",
    "fragrance",
    "deo",
    "beauty"
  ] },
  { id: '4', name: 'Men\'s Fashion', image: require('..//..//assets/menfashion.png'), 
  "tags": [
    "men'sfashion",
    "men's fashion",
    "shirts&t-shirts",
    "menshirt",
    "mentshirt",
    "t-shirt",
    "jeans&trousers",
    "menjeans",
    "men'sjeans",
    "ethnicwear",
    "menethnicwear",
    "winterwear",
    "menwinterwear",
    "watches",
    "menwatch",
    "smartwatch",
    "accessories",
    "menaccessories",
    "backpack",
    "bags"
  ] },


  { id: '6', name: 'Women\'s Fashion', image: require('..//..//assets/womenfashion.png'), 
  "tags": [
    "womenfashion",
    "women's fashion",
    "shirts&t-shirts",
    "womenshirt",
    "womentshirt",
    "womenshirts",
    "jeans&trousers",
    "womenjeans",
    "womentrouser",
    "ethnicwear",
    "sarees",
    "saree",
    "winterwear",
    "womenwinterwear",
    "watches",
    "womenwatch",
    "smartwatch"
  ] },


  { id: '3', name: 'Gadgets', image: require('..//..//assets/gadgets.png'), "tags": [
    "electronics&gadgets",
    "electronics",
    "mobiles",
    "phone",
    "phones",
    "smartphone",
    "laptops",
    "cameras",
    "earphones",
    "headphones",
    "televisions",
    "tv",
    "airconditioners",
    "ac",
    "others"
  ] },


  { id: '7', name: 'Home', image: require('..//..//assets/home.png'), "tags": [
    "home improvement",
    "kitchenware",
    "kitchen ware",
    "homedecor",
    "home decor",
    "furnishing",
    "appliances",
    "ac",
    "tv",
    "television",
    "refrigerator",
    "fridge",
    "bathroomaccessories",
    "bathroom",
    "outdoorandgarden",
    "outdoor",
    "garden",
    "diytools"
  ] },

  { id: '10', name: 'See All', image: require('..//..//assets/seeall.png'), tags: ['all'] },
];

const handleCategoryClick = (category) => {
  console.log(category.tags);
  router.push({ pathname: 'Screens/DealsList', params: { tags: category.tags } });
};

const CategoriesSection = () => {
  const navigation = useNavigation();

  const handleSeeAllClick = () => {
    // Navigate to the "Categories" tab screen
    navigation.navigate('Categories');
  };

  return (
  
    <View style={styles.container}>
      <Text style={styles.title}>EXPLORE CATEGORIES</Text>
      <View style={styles.row}>
        {categories.slice(0, 4).map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryCard}
            onPress={() => handleCategoryClick(category)}
          >
            <Image source={category.image} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.row}>
        {categories.slice(4, 7).map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryCard}
            onPress={() => handleCategoryClick(category)}
          >
            <Image source={category.image} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.categoryCard} onPress={handleSeeAllClick}>
          <Image source={categories[7].image} style={styles.categoryImage} />
          <Text style={styles.categoryText}>{categories[7].name}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
 
  container: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    paddingLeft:15,
    paddingRight:15
    
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  categoryCard: {
    width: '23%', // Adjust width as needed based on your design
    alignItems: 'center',
    padding:5
  },
  categoryImage: {
    height: 100,
    width: 100,
    borderRadius: 60, // Half of the width and height to make it circular
    overflow: 'hidden',
    resizeMode:'cover',
 
  },

  categoryText: {
    fontSize: 13,
    textAlign: 'center',
    fontWeight: "400",
    color: '#222',
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'uppercase', // Corrected property
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    paddingTop: 20,
    paddingBottom: 5,
    fontWeight: '700',
    textAlign: 'left',
    marginLeft:5
  },

  backgroundGradient: {
    flex: 1,
  },
});

export default CategoriesSection;
