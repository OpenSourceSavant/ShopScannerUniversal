import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { TouchableOpacity, Text, ImageBackground } from 'react-native';
import round299 from '../../assets/round299.png';
import round499 from '../../assets/round499.png';
import round799 from '../../assets/round799.png';
import round999 from '../../assets/round999.png';
import round1999 from '../../assets/round1999.png';
import { Link,router } from 'expo-router';

const PriceCards = () => {
  
  const amounts = [299, 499, 799, 999, 1999];

  const handleCard2Press = (amount) => {
    let tagString = 'under' + amount;
    router.push({ pathname: 'Screens/DealsList', params: { tags: tagString } });
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
    <View style={{backgroundColor:'#f5f5f5',marginTop:10}}>
          <Text style={{   
            fontFamily: 'Poppins-SemiBold',
            marginTop:10,
            marginBottom:10,
            fontSize: 16,
            paddingBottom: 5,
            fontWeight: '700',
            textAlign: 'left',
            marginLeft:10, 
             }}>
    FILTER BY PRICE
  </Text>
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {amounts.map((amount, index) => {
        return (
          <View key={index} style={styles.cardContainer}>
            <TouchableOpacity onPress={() => handleCard2Press(amount)}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding:5
  },
  cardContainer: {
    marginRight: 16,
  },
  imageBackground: {
    width: 180,
    height: 180,
    borderRadius: 75, // Updated for a perfect circle
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PriceCards;
