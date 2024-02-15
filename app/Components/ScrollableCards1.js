import React from 'react';
import { ScrollView,View,Image,StyleSheet } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { Link,router } from 'expo-router';




const ScrollableCards1 = ({ cardsData }) => {




  const handleCardClick = () => {
    //console.log('Category clicked with tags:', tags);
    router.push('Screens/DealsList')
  };



  return (

    <View style={{backgroundColor:'#f5f5f5'}}>
      <Image
          source={require('..//..//assets/banners-14.png')}
          style={styles.topimage}/>

    <ScrollView
      horizontal
      style={{ padding: 16 }}
      showsHorizontalScrollIndicator={false}
    >
      {cardsData.map((card, index) => (
        <Card key={index} style={{ marginRight: 16 }} onPress={() => handleCardClick()}>
          <Card.Cover source={{ uri: card.image }} style={{ height: 150,width:170, borderRadius: 8,resizeMode:'contain' }} />
       
        </Card>
      ))}
    </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  image: {
    width: '100%', // Adjust width as needed based on your design
    height: 230,
    resizeMode:'contain'
    
  },
  topimage:{
    width:'100%',
    height:150,
    resizeMode:'cover'
  }
});

export default ScrollableCards1;
