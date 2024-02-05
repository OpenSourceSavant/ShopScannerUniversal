import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { TouchableOpacity, Text, ImageBackground } from 'react-native';
import round299 from '../../assets/round299.png';
import round499 from '../../assets/round499.png';
import round799 from '../../assets/round799.png';
import round999 from '../../assets/round999.png';
import round1999 from '../../assets/round1999.png';

const PriceCards = () => {
  
  const amounts = [299, 499, 799, 999, 1999];

  const handleCard2Press = (amount, previousAmount) => {
    console.log('amount', previousAmount);
    navigation.navigate('DealsList', { type: 'amount', amount: amount, previousAmount: previousAmount });

  };

  const getImageForAmount = (amount) => {
    if (amount === 299) {
      return round299;
    } else if (amount === 499) {
      return round499;
    } else if (amount === 799) {
      return round799;
    } else if (amount === 999) {
      return round999;
    } else if (amount === 1999) {
      return round1999;
    }
    // Default image if amount doesn't match any specific value
    return null;
  };

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {amounts.map((amount, index) => {
        const previousAmount = amounts[index - 1] || 0; // Get the next amount, or null if it's the last element
        return (
          <View key={index} style={styles.cardContainer}>
            <TouchableOpacity onPress={() => handleCard2Press(amount, previousAmount)}>
              <ImageBackground
                source={getImageForAmount(amount)}
                style={styles.imageBackground}
              >
               
              </ImageBackground>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
  },
  cardContainer: {
    marginRight: 16,
  },
  imageBackground: {
    width: 190,
    height: 190,
    borderRadius: 85, // Updated for a perfect circle
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PriceCards;
