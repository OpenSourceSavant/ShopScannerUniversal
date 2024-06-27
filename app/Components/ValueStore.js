import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

let FastImage;

if (Platform.OS === 'android' || Platform.OS === 'ios') {
  FastImage = require('react-native-fast-image');
}

const ValueStore = () => {

  const handleLinkPress = (value) => {
    router.push({ pathname: 'Screens/DealsList', params: { tags: value } });
  };

  return (
    <LinearGradient
      colors={['#FFF0F5', '#F5C5DB']} // Define gradient colors
      style={styles.container}
    >
      <FastImage
        source={require('..//..//assets/banners-13_prev_ui.png')}
        style={styles.topimage}
        resizeMode={FastImage.resizeMode.cover}
      />

      <View style={styles.gridContainer}>
        <TouchableOpacity onPress={() => handleLinkPress(['makeup', 'sunscreen', 'face serum', 'faceserum', 'serum', 'moisturizer', 'moituriser', 'hair care', 'hairwash', 'shampoo', 'hairserum', 'makeup'])} style={styles.gridItem}>
          <FastImage
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/smartsaver-ace3e.appspot.com/o/ValueStore1.png?alt=media&token=568f28e8-3d8b-44f1-bee7-4e403094c42e' }}
            style={styles.image}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleLinkPress(['skincare'])} style={[styles.gridItem, { marginTop: 20 }]}>
          <FastImage
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/smartsaver-ace3e.appspot.com/o/ValueStore2.png?alt=media&token=c86ce4e8-1d35-4b52-832b-1ea06dc59221' }}
            style={styles.image}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleLinkPress(['haircare', 'hairwash', 'shampoo', 'hairserum'])} style={styles.gridItem}>
          <FastImage
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/smartsaver-ace3e.appspot.com/o/ValueStore3.png?alt=media&token=08185695-1a88-4665-9183-fae78973a425' }}
            style={styles.image}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleLinkPress(['fragranes', 'perfumes', 'perfume', 'fragrance', 'deo'])} style={[styles.gridItem, { marginTop: 20 }]}>
          <FastImage
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/smartsaver-ace3e.appspot.com/o/ValueStore4.png?alt=media&token=aa76cfb2-88fa-4531-bfa8-b8c917003157' }}
            style={styles.image}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>

        {/* Add more links for other items */}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the gradient covers the entire screen
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 5, // Add some padding for better layout
  },
  gridItem: {
    width: '48%', // Adjust width as needed based on your design
    marginBottom: 10,
  },
  image: {
    width: '100%', // Adjust width as needed based on your design
    height: 250,
    borderRadius: 8, // Optional: add rounded corners
  },
  topimage: {
    width: '100%',
    height: 150,
  },
});

export default ValueStore;
