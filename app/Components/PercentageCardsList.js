import React from 'react';
import { ScrollView, View, StyleSheet,Image } from 'react-native';
import { TouchableOpacity, Text, ImageBackground } from 'react-native';
import { router,useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const PercentageCardsList = () => {
  const percentages = [ 90,80,70,60,50];
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
    <View style={{}}>

<View style={styles.lineContainer}>
            <LinearGradient
                      colors={['#e0e0e0', '#000']}
                      style={styles.line}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}/>
            <Text style={styles.title}>CHOOSE YOUR DISCOUNT</Text>
            <LinearGradient
                        colors={['#000', '#e0e0e0']}
                        style={styles.line}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}/>
      </View>
    
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
  title: {
    fontFamily: 'Roboto',
    paddingBottom: 5,
    paddingLeft:15,
    paddingRight:15,
    paddingTop:5,
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 14,
    color: '#e91e63', // Pink theme color
    textTransform: 'uppercase', // Modern style
    letterSpacing: 1.2, // Adds spacing between letters for a modern look
    backgroundColor: 'rgba(233, 30, 99, 0.1)', // Light pink background to highlight the title
    paddingVertical: 10, // Add vertical padding for better readability
    borderRadius: 8, // Slightly rounded corners
    overflow: 'hidden', // Ensure rounded corners are clipped
  },  
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:10,
    marginTop:20
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#000',
    marginLeft:10,
    marginRight:10
    
  },
});

export default PercentageCardsList;
