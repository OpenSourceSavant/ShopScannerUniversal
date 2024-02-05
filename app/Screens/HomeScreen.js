// HomeScreen.js
import React from 'react';
import { View, Text, ScrollView,StyleSheet } from 'react-native';
import ValueStore from '../Components/ValueStore';
import PercentageCardsList from '../Components/PercentageCardsList';
import CategoriesSection from '../Components/CategoriesSection';
import PriceCards from '../Components/PriceCards';
import ArrivedJustNow from '../Components/ArrivedJustNow';
import TopHomeCarousel from '../Components/TopHomeCarousel';
import { Appbar } from 'react-native-paper';


const HomeScreen = () => (
  <View style={styles.container}>
    {/* React Native Paper AppBar */}
    <Appbar.Header style={{ height: 55,backgroundColor:'#fff' }}>
    <Appbar.Content title="Shop Scanner" style={{}} />
  </Appbar.Header>
    <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        <TopHomeCarousel/>
        <CategoriesSection/>
        <ArrivedJustNow/>
        <PercentageCardsList/>
        <ValueStore />
        <PriceCards/>
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
