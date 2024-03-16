import React from 'react';
import { View, Text, StyleSheet,Image,TouchableOpacity,Platform } from 'react-native';
import { InstantSearch } from 'react-instantsearch-core';
import { SearchBox } from '../Components/SearchBox';
import algoliasearch from 'algoliasearch/lite';
import { InfiniteHits } from '../Components/InfiniteHits';
const searchClient = algoliasearch('ITUIHLX50S', 'fb78cbb6dede7d8765f202d9f529e963');
import Hit from '../Components/Hit';
import logo from '..//..//assets/icon.png'; // Replace with the correct path
import trending_icon from '..//..//assets/trending_icon.png'; // Replace with the correct path
import { StatusBar } from 'expo-status-bar';

import backIcon from '..//..//assets/left-arrow.png'; // Replace with the correct path
import { useLocalSearchParams,router,useNavigation } from "expo-router";



const SearchScreen = () => {
    const lastRoute = useLocalSearchParams().lastRoute;
    const handleBackPress = () => {
        // Determine the target stack based on the platform
        const isMobileWeb = Platform.OS === 'web' && window.innerWidth <= 768; // Adjust the width as needed
      
        const targetStack = isMobileWeb ? 'MobileWebStack' : 'MobileStack';
        // Replace the route with the target stack
        //router.replace(targetStack);
        const navigationParams = {
          pathname: targetStack,
        };
        
        if (lastRoute) {
          navigationParams.params = {
            lastRoute: lastRoute,
            initialRouteSubCategory:initialRouteSubCategory
          };
        }
        
        router.replace(navigationParams);
      };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#fff' />
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', elevation: 3, height: 70 }}>
                <TouchableOpacity onPress={handleBackPress} style={{ padding: 10 }}>
                    <Image source={backIcon} style={{ width: 24, height: 24, margin: 0 }} />
                </TouchableOpacity>
                
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 'auto' }}>
                    <Image source={logo} style={{ width: 64, height: 64, marginRight: 5 }} />
                </View>
            </View>
      <InstantSearch searchClient={searchClient} indexName="shop_scanner_index">
        <View style={styles.searchBoxContainer}>
          <SearchBox/>
          <View style={styles.trendingRowContainer}>
            <Text style={styles.trendingText}>Trending Searches</Text>
            <Image source={trending_icon} style={styles.trendingIcon} />
          </View>
          <InfiniteHits hitComponent={Hit} />
        </View>
      </InstantSearch>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align items at the top
   
  },
  searchBoxContainer: {
    flex:1,
    width:'100%',
    padding:10
    
  },

  trendingRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 20,
  },
  trendingText: {
    fontWeight: '300',
    fontSize: 15,
    marginRight: 10, // Adjust as needed
    marginLeft:3,
    fontFamily:'Poppins-SemiBold'
  },
  trendingIcon: {
    width: 20,
    height: 20,
    display:'none'
  },
});

export default SearchScreen;


