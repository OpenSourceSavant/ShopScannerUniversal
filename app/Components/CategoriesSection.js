import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const categories = [
  { id: '1', name: 'Gadgets', image: 'https://firebasestorage.googleapis.com/v0/b/smartsaver-ace3e.appspot.com/o/Rectangle%206.png?alt=media&token=d3d4bd9a-774e-494d-ab2d-f5ac91d90e6c' },
  { id: '2', name: 'Men\'s Fashion', image: 'https://firebasestorage.googleapis.com/v0/b/smartsaver-ace3e.appspot.com/o/733AB344-5315-4C26-B1DC-1223523F4A5A.png?alt=media&token=0710f366-f340-499a-aadc-ad5cc02bdb13' },
  { id: '3', name: 'Women\'s Fashion', image: 'https://firebasestorage.googleapis.com/v0/b/smartsaver-ace3e.appspot.com/o/878CF2FB-31FE-4B3F-BF9E-F96BB5F076CE.png?alt=media&token=b7102f95-2e22-46a5-8090-4ec12beec251' },
  { id: '4', name: 'Men\'s Footwear', image: 'https://firebasestorage.googleapis.com/v0/b/smartsaver-ace3e.appspot.com/o/A70864C8-1B1F-4014-84A4-450CD75C9CEF.png?alt=media&token=65eaafb2-3620-49ec-9b0d-157e132ffbbe' },
  { id: '5', name: 'Women\'s Footwear', image: 'https://firebasestorage.googleapis.com/v0/b/smartsaver-ace3e.appspot.com/o/A0A54F52-A5F3-45D8-8517-39D6BCC0A5E1.png?alt=media&token=dd2c53f9-e335-40d1-8ee4-b9a87b8caa5d' },
  { id: '6', name: 'Beauty', image: 'https://firebasestorage.googleapis.com/v0/b/smartsaver-ace3e.appspot.com/o/2289C231-211F-4850-B7AF-5EF0F942B4F7.png?alt=media&token=5db1b1ef-1433-40b0-9510-827302d1ae11' },
  { id: '7', name: 'Home', image: 'https://firebasestorage.googleapis.com/v0/b/smartsaver-ace3e.appspot.com/o/image%20268.png?alt=media&token=1d1f1941-8d81-4287-ae9e-62efbf882f01' },
  { id: '8', name: 'See All', image: 'https://firebasestorage.googleapis.com/v0/b/smartsaver-ace3e.appspot.com/o/application_9710991.png?alt=media&token=116c8b4f-5efc-455b-865e-61f606f6f808' }
  // Add more unique categories as needed
];

const CategoriesSection = () => (
  <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.row}>
      {categories.slice(0, 4).map((category) => (
        <TouchableOpacity
          key={category.id}
          style={styles.categoryCard}
          onPress={() => handleCategoryClick(category)}
        >
          <Image source={{ uri: category.image }} style={styles.categoryImage} />
          <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
    <View style={styles.row}>
      {categories.slice(4).map((category) => (
        <TouchableOpacity
          key={category.id}
          style={styles.categoryCard}
          onPress={() => handleCategoryClick(category)}
        >
          <Image source={{ uri: category.image }} style={styles.categoryImage} />
          <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    padding: 4,
    marginTop:10
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
    height: 60,
    width: 60,
    borderRadius: 35, // Half of the width and height to make it circular
    overflow: 'visible',
  },
  categoryText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    marginTop:5
  },
});

export default CategoriesSection;
