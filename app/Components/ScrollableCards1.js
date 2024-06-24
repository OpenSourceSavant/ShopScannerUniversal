import React,{useEffect} from 'react';
import { ScrollView, View, Image, StyleSheet, Platform } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { router } from 'expo-router';
import setupGoogleAnalytics from '../analytics';

const isAndroid = Platform.OS === 'android';

if (Platform.OS === 'android' ||Platform.OS === 'ios') {
  FastImage = require('react-native-fast-image');
}

const ScrollableCards1 = ({ cardsData }) => {

  let analytics;

  useEffect(() => {
    const initializeAnalytics = async () => {
       analytics = await setupGoogleAnalytics();
      // Now you can use 'analytics' to log events or retrieve analytics data
    };

    initializeAnalytics();
  }, []);


  const handleCardClick = (tags,googleAnalytics) => {
    //console.log('Category clicked with tags:', tags);
    router.push({ pathname: 'Screens/DealsList', params: { tags: tags } });
    if (analytics){
    analytics.logEvent('scrollable_bottom_cards')
    }
  };

  return (
    <View style={{ backgroundColor: '#f5f5f5' }}>
      <Image
        source={require('..//..//assets/banners-14.png')}
        style={styles.topimage}
      />
      <ScrollView
        horizontal
        style={{ padding: 16 }}
        showsHorizontalScrollIndicator={false}
      >
        {cardsData.map((card, index) => (
          <Card key={index} style={{ marginRight: 16 }} onPress={() => handleCardClick(card.tags)}>
            {((isAndroid || Platform.OS === 'ios') && !Platform.OS === 'web') ? (
              <FastImage source={{ uri: card.image }} style={{ height: 150, width: 170, borderRadius: 8, resizeMode: 'contain' }} />
            ) : (
              <Card.Cover source={{ uri: card.image }} style={{ height: 150, width: 170, borderRadius: 8, resizeMode: 'contain' }} />
            )}
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
    resizeMode: 'contain'
  },
  topimage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover'
  }
});

export default ScrollableCards1;
