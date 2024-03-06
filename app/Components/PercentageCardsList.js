import React from 'react';
import { ScrollView, View, StyleSheet,Image } from 'react-native';
import { TouchableOpacity, Text, ImageBackground } from 'react-native';
import { router,useLocalSearchParams } from 'expo-router';

const PercentageCardsList = () => {
  const percentages = [50, 60, 70, 80, 90];
  const params = useLocalSearchParams();

  const handleCardPress = (percentage) => {
    let tagString = 'morethan' + percentage;
  

    router.push({ pathname: 'Screens/DealsList', params: { tags: tagString } });
  };

  const getImageForPercentage = (percentage) => {
    if (percentage >= 90) {
      return require('..//..//assets/image_90_percent.png');
    } else if (percentage >= 80) {
      return require('..//..//assets/image_80_percent.png');
    } else if (percentage >= 70) {
      return require('..//..//assets/image_70_percent.png');
    } else if (percentage >= 60) {
      return require('..//..//assets/image_60_percent.png');
    } else if (percentage >= 50) {
      return require('..//..//assets/image_50_percent.png');
    }
    // Default image if percentage is not in the specified ranges
  }

  return (
    <View style={{marginTop:25}}>
      <Text style={{    
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        paddingBottom: 5,
        fontWeight: '700',
        textAlign: 'left',
        marginLeft:10,
    }}>
    CHOOSE YOUR DISCOUNT
  </Text>
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {percentages.map((percentage, index) => (
        <View key={index} style={styles.cardContainer}>
          <TouchableOpacity onPress={() => handleCardPress(percentage)}>
            
          <Image
              source={getImageForPercentage(percentage)}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin:10
  },
  cardContainer: {
    marginRight: 16,
  },
  imageBackground: {
    width: 140,
    height: 140,
    borderRadius: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  image: {
    width: 170,
    height: 170,
  },
});

export default PercentageCardsList;
