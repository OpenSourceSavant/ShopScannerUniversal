// HomeScreen.js
import React from 'react';
import { View, Text, ScrollView,StyleSheet,Image } from 'react-native';
import ValueStore from '../Components/ValueStore';
import PercentageCardsList from '../Components/PercentageCardsList';
import CategoriesSection from '../Components/CategoriesSection';
import PriceCards from '../Components/PriceCards';
import ArrivedJustNow from '../Components/ArrivedJustNow';
import TopHomeCarousel from '../Components/TopHomeCarousel';
import { Appbar } from 'react-native-paper';
import MadeWithLove from '../Components/MadeWithLove';
import ScrollableCards1 from '../Components/ScrollableCards1';
import BottomHomeCarousel from '../Components/BottomHomeCarousel';

const cardsData1 = [
  { image: 'https://firebasestorage.googleapis.com/v0/b/smartsaver-ace3e.appspot.com/o/sample%202-09%20(1).png?alt=media&token=847953b0-2fe6-4297-a3c6-b73be0616a2d' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/smartsaver-ace3e.appspot.com/o/sample%202-12%20(1).png?alt=media&token=51a43316-7273-43c8-8ae0-6548c7c288cb' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/smartsaver-ace3e.appspot.com/o/sample%202-11%20(1).png?alt=media&token=dc56ca71-3815-4c50-99dd-13be3a04e1f1' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/smartsaver-ace3e.appspot.com/o/sample%202-10%20(1).png?alt=media&token=0bbd9921-a2a1-4e13-bb17-edc89cf39a1b' },
  // Add more cards as needed
];

const HomeScreen = () => (
  <View style={styles.container}>
    {/* React Native Paper AppBar */}
    <Appbar.Header style={{ backgroundColor:'#fff' }}>
    <Appbar.Action icon={() => <Image source={require('..//..//assets/menu-burger.png')} style={{ width: 20, height: 20 }} />}  />

    <Appbar.Content title="Shop Scanner" color='#000' style={{
      fontSize: 16,
      verticalAlign: 'top',
      position: 'relative',
      fontWeight: '700',
      fontFamily: 'Assistant',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      lineHeight: 'normal',
      textTransform: 'capitalize',
    }}
  />  
    <Appbar.Action icon={() => <Image source={require('..//..//assets/user.png')} style={{ width: 20, height: 20 }} />}  />
    <Appbar.Action icon={() => <Image source={require('..//..//assets/settings.png')} style={{ width: 20, height: 20 }} />}  />

  </Appbar.Header>
    <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        <TopHomeCarousel/>
        <CategoriesSection/>
        <ArrivedJustNow/>
        <BottomHomeCarousel/>
        <PercentageCardsList/>
        <ValueStore />
        <PriceCards/>
        <ScrollableCards1 cardsData={cardsData1} />
        <MadeWithLove/>

  </ScrollView>
  </View>
);


const styles = StyleSheet.create({
    scrollViewContent: {
      flexGrow: 1,
    },
    container: {
      flex: 1,
    },
  });

export default HomeScreen;
