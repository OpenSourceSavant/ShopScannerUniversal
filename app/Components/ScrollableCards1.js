import React,{useEffect} from 'react';
import { ScrollView, View, Image, StyleSheet, Platform } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { router } from 'expo-router';
import setupGoogleAnalytics from '../analytics';
import FastImage from 'react-native-fast-image';

const isAndroid = Platform.OS === 'android';

const cardsData1 = [
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/smartsaver-ace3e.appspot.com/o/sample%202-09%20(1).png?alt=media&token=847953b0-2fe6-4297-a3c6-b73be0616a2d",
    tags: [
      "beauty",
      "beauty & personal care",
      "facewash",
      "sunscreen",
      "face serum",
      "faceserum",
      "serum",
      "moisturizer",
      "moituriser",
      "hair care",
      "hairwash",
      "shampoo",
      "hairserum",
      "makeup",
      "perfumes",
      "perfume",
      "fragrance",
      "deo",
    ],
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/smartsaver-ace3e.appspot.com/o/sample%202-12%20(1).png?alt=media&token=51a43316-7273-43c8-8ae0-6548c7c288cb",
    tags: [
      "footwear",
      "casual shoes",
      "casualshoes",
      "sports shoes",
      "sportsshoes",
      "formal shoes",
      "formalshoes",
      "flip flops",
      "flipflops",
      "heels",
    ],
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/smartsaver-ace3e.appspot.com/o/sample%202-11%20(1).png?alt=media&token=dc56ca71-3815-4c50-99dd-13be3a04e1f1",
    tags: [
      "beauty",
      "beauty & personal care",
      "facewash",
      "sunscreen",
      "face serum",
      "faceserum",
      "serum",
      "moisturizer",
      "moituriser",
      "hair care",
      "hairwash",
      "shampoo",
      "hairserum",
      "makeup",
      "perfumes",
      "perfume",
      "fragrance",
      "deo",
      "women's fashion",
      "shirts & t-shirts",
      "womenshirt",
      "womentshirt",
      "womenshirts",
      "jeans & trousers",
      "womenjeans",
      "womentrouser",
      "women ethnic wear",
      "womenethnicwear",
      "sarees",
      "saree",
      "lehenga",
      "winter wear",
      "womenwinterwear",
      "watches",
      "womenwatch",
      "smartwatch",
      "accessories",
      "womenaccessories",
      "backpack",
      "bags",
      "men's fashion",
      "shirts & t-shirts",
      "menshirt",
      "mentshirt",
      "t-shirt",
      "jeans & trousers",
      "men jeans",
      "men's jeans",
      "ethnic wear",
      "menethnicwear",
      "winter wear",
      "menwinterwear",
      "watches",
      "menwatch",
      "smartwatch",
      "accessories",
      "menaccessories",
      "backpack",
      "bags",
    ],
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/smartsaver-ace3e.appspot.com/o/sample%202-10%20(1).png?alt=media&token=0bbd9921-a2a1-4e13-bb17-edc89cf39a1b",
    tags: ["haircare", "hair care", "hairwash", "shampoo", "hairserum"],
  },
];


const ScrollableCards1 = () => {

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
        {cardsData1.map((card, index) => (
          <Card key={index} style={{ marginRight: 16 }} onPress={() => handleCardClick(card.tags)}>
              <FastImage source={{ uri: card.image }} style={{ height: 150, width: 170, borderRadius: 8, resizeMode: 'contain' }} />
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
