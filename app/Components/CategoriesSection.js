import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { router, useNavigation } from 'expo-router';

const categories = [
  { id: '1', name: 'Latest', image: require('..//..//assets/new.png'), tags: null },
  { id: '2', name: 'Hot', image: require('..//..//assets/hotsale.jpg'), tags: ['hot'] },
  { id: '3', name: 'Gadgets', image: require('..//..//assets/gadgets.png'), tags: ['electronics', 'gadgets'] },
  { id: '4', name: 'Men\'s Fashion', image: require('..//..//assets/menfashion.png'), tags: ['menfashion'] },
  { id: '6', name: 'Women\'s Fashion', image: require('..//..//assets/menfootwear.png'), tags: ['womenfashion'] },
  { id: '7', name: 'Home', image: require('..//..//assets/homedecor.jpg'), tags: ['home'] },
  { id: '8', name: 'Beauty', image: require('..//..//assets/beauty.png'), tags: ['beauty'] },
  { id: '10', name: 'See All', image: require('..//..//assets/showall.png'), tags: ['all'] },
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
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  categoryCard: {
    width: '25%', // Adjust width as needed based on your design
    alignItems: 'center',
  },
  categoryImage: {
    height: 55,
    width: 55,
    borderRadius: 30, // Half of the width and height to make it circular
    overflow: 'hidden',
  },

  categoryText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 5,
    color: '#000',
    fontFamily: 'Poppins-Black',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 30,
    fontWeight: '700',
    textAlign: 'left',
  },
});

export default CategoriesSection;
