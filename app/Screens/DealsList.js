import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, Text, TouchableOpacity, Image, View,TouchableWithoutFeedback,Modal,StyleSheet } from 'react-native';
import {db} from '..//..//firebaseConfig'; // Adjust the import according to your Firebase configuration file
import amazonLogo from '..//..//assets/amazon_logo.png';
import flipkartLogo from '..//..//assets/flipkart_logo.png';
import { collection, getDocs, query, orderBy, limit,startAfter, where } from 'firebase/firestore';
import { ActivityIndicator, MD2Colors,Appbar,Chip,Button,RadioButton } from 'react-native-paper';
import { Linking } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';
import { useLocalSearchParams,router } from "expo-router";

const DealsList = () => {

  const containerRef = useRef();

  const [deals, setDeals] = useState([]);
  const [isMoreDataAvailable, setIsMoreDataAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);


  const [selectedOption, setSelectedOption] = useState(null);


    const tagsObject = useLocalSearchParams().tags;
    // Check if tagsObject is a string and has values
    const tags = typeof tagsObject === 'string' && tagsObject !== null
    ? tagsObject.split(',')
    : [];

    


  const handleDealClick = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (err) {
      console.error('Error opening URL:', err);
    }
  };
  
  const handleIconClick = () => {
    console.log('Icon clicked!');
  };

  const handleBackPress = () => {
    // Handle your back press logic here
    console.log('Back button pressed!');
    router.replace('MobileWebStack');

    
  };




  // Sort/////////////////////////

  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const showBottomSheet = () => setBottomSheetVisible(true);
  
  const hideBottomSheet = () => {
    setBottomSheetVisible(false);
    setSelectedOption(null); // Reset selectedOption when hiding the bottom sheet
  };
  
  const handleSortOptionPress = async (option) => {
    setSelectedOption(option);
    hideBottomSheet();
    setLastVisible(null);
    
    console.log('sprted option',option)
    // Fetch deals based on the selected sorting option
    await fetchDeals({ sortOption: option });
  };
  

  






  const fetchDeals = async ({ sortOption } = {}) => {
    setIsLoading(true);
  
    try {
      console.log(tags);
  
      let dealsQuery;
  
      if (lastVisible && isMoreDataAvailable) {
        const orderField = sortOption || 'dealTime';
  
        dealsQuery = query(
          collection(db, 'deals'),
          ...(tags && tags.length > 0 ? [where('Tags', 'array-contains-any', tags)] : []),
          orderBy(orderField, 'desc'),
          startAfter(lastVisible),
          limit(10)
        );
      } else {
        // Default query
        dealsQuery = query(
          collection(db, 'deals'),
          ...(tags && tags.length > 0 ? [where('Tags', 'array-contains-any', tags)] : []),
          orderBy(sortOption || 'dealTime', 'desc'),
          limit(10)
        );
      }
  
      console.log('dealsQuery:', dealsQuery);
  
      const querySnapshot = await getDocs(dealsQuery);
  
      console.log('querySnapshot:', querySnapshot);
  
      if (!querySnapshot.empty && querySnapshot.docs.length > 0) {
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
        // Reset deals state if it's a new sort or the initial fetch
        if (!lastVisible || sortOption) {
          setDeals(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        } else {
          // Append new deals to the existing list
          setDeals((prevDeals) => [...prevDeals, ...querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))]);
        }
      } else {
        setIsMoreDataAvailable(false);
      }
    } catch (error) {
      console.error('Error fetching deals:', error.message);
      // Handle other errors (show an error message, set an error state, etc.)
    } finally {
      setIsLoading(false);
    }
  };
  
  
  
  
  


const handleScroll = ({ nativeEvent: { contentOffset: { y }, velocity, contentSize, layoutMeasurement } }) => {
  const scrollThreshold = 200;
    const isBottom = y >= contentSize.height - layoutMeasurement.height - scrollThreshold;

    if (isBottom && isMoreDataAvailable) {
      fetchDeals();
    }

   

  };


  //////////////////CHIP SECTION //////////////////////////////////////////////////////////////////////////////////////////


  const [selectedChip, setSelectedChip] = useState(null);


  const chipData = [
    { label: 'HOT', icon: 'fire' },
    { label: 'TRENDING', icon: 'fire' },
    { label: 'UNDER 999', icon: 'fire' },
    // Add more chips as needed
  ];



  const handleChipPress = (label) => {
    setSelectedChip(label);
    console.log(`Pressed: ${label}`);
  };
  




//////////////////////////////////////////////////////////////////////////////////////////////////////  



  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    fetchDeals();

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isMoreDataAvailable, selectedOption]);


  const timeAgo = (firestoreTimestamp) => {
    // Convert Firestore timestamp to JavaScript Date object
    const dealDate = new Date(firestoreTimestamp.seconds * 1000);
  
    const now = new Date();
    const differenceInSeconds = Math.round((now - dealDate) / 1000);
    const minutes = Math.round(differenceInSeconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);
  
    if (differenceInSeconds < 60) {
      return `${differenceInSeconds} second${differenceInSeconds === 1 ? '' : 's'} ago`;
  } else if (minutes < 60) {
      return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  } else if (hours < 24) {
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  } else {
      return `${days} day${days === 1 ? '' : 's'} ago`;
  }
  };


  return (

    <View style={{flex:1}}>

<Appbar.Header>
  {/* Use Appbar.Action for custom icon */}
  <Appbar.Action icon={() => (
    <Image
      source={require('..//..//assets/left-arrow.png')} // Replace with the actual path to your custom icon
      style={{ width: 24, height: 24 }} // Adjust the dimensions as needed
    />
  )} onPress={handleBackPress} />
  
  {/* Other components in the header */}
  <Appbar.Content title="Deals List" />
</Appbar.Header>
  
    

 

   
    <ScrollView style={{ flex: 1 }} onScroll={handleScroll} scrollEventThrottle={50}>

    {/* ######################################SORT AND FILTER BAR ###################################### */}
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 45 }}>
      {/* Sort Button */}
      <TouchableWithoutFeedback onPress={showBottomSheet}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../../assets/user.png')} style={{ width: 24, height: 24 }} />
          <Text style={{ fontWeight: '600', marginLeft: 5, color: '#000' }}>Sort</Text>
        </View>
      </TouchableWithoutFeedback>

      {/* Divider */}
      <View style={{ height: '80%', width: 1, backgroundColor: '#ccc' }} />


      {/* Filter Button */}
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <Image source={require('../../assets/filter.png')} style={{ width: 18, height: 18 }} />
        <Text style={{ fontWeight: '300', marginLeft: 5,fontSize:19 }}>Filter</Text>
      </View>


    </View>

    <Modal
      transparent={true}
      animationType="slide"
      visible={bottomSheetVisible}
    >
      <View style={styles.modalContainer}>
        <View style={styles.bottomSheet}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={hideBottomSheet}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>

          {/* Sort Options */}
          <Text style={styles.title}>Sort Options</Text>
          <View>
            <RadioButton.Group
              onValueChange={(value) => handleSortOptionPress(value)}
              value={selectedOption}
            >
              <View style={styles.radioButtonContainer}>
                <RadioButton.Item label="Sort by Price (Low to High)" value="dealPrice" />
                <RadioButton.Item label="Sort by Discount (Low to High)" value="discountPercentage" />
                {/* Add more sorting options as needed */}
              </View>
            </RadioButton.Group>
          </View>
        </View>
      </View>
    </Modal>
    {/*
    <View style={{ flexDirection: 'row', padding: 10, maxHeight: 90, display: 'flex' }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', padding: 10, maxHeight: 70 }}>
          {chipData.map((chip, index) => (
            <Chip
              key={index}
              icon={chip.icon}
              mode="outlined"
              onPress={() => handleChipPress(chip.label)}
              selected={selectedChip === chip.label}
              style={{
                margin: 5,
                borderColor: selectedChip === chip.label ? 'blue' : 'black',
                borderRadius: 20,
              }}
              textStyle={{ color: selectedChip === chip.label ? 'blue' : 'black' }}
            >
              {chip.label}
            </Chip>
          ))}
        </ScrollView>
    </View>
            */}  
      
        <View style={{ flex: 1 }}>
        {deals.length === 0 ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>No deals available</Text>
      </View>
      
        
        ) : (
          // Deals Section
        <View style={{flex:1,maxWidth:'100%'}}>
          {deals.map((deal) => (
            <TouchableOpacity
              key={deal.dealId}
              onPress={() => handleDealClick(deal.storeUrl)}
              style={{ width: '98%', height: 150, margin: 4,backgroundColor:'#fff' }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  height: '100%',
                  padding: 8,
                  borderWidth: 1,
                  borderColor: '#ddd',
                  borderRadius: 4,
                }}
              >
                {/* Content for the first div */}
                <View style={{ width: '35%', flexDirection: 'column' }}>
                  <View style={{ width: '100%', height: '10%', padding: 5 }}>
                    <Image
                      source={
                        deal.store === 'flipkart'
                          ? flipkartLogo
                          : amazonLogo
                      }
                      style={{
                        width: 40,
                        height:20,
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                  <View style={{ width: '100%', height: '90%', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                      source={{ uri: deal.imageUrl }}
                      style={{
                          width:100,
                          height:100,
                          resizeMode: 'contain', // Add this line
                          marginRight: 10,
                      }}
                    />
                  </View>
                </View>

                {/* Content for the second div */}
                <View style={{ width: '65%', backgroundColor: '#fff' }}>
                  <Text style={{ textAlign: 'right', fontSize: 12,marginBottom:10,fontFamily:'sans-serif',right:5 }}>
                    {timeAgo(deal.dealTime)}
                  </Text>

                  <Text 
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    marginBottom: 8,
                    lineHeight: 16,
                    overflow: 'hidden',
                    
                  }}>
                    {deal.productTitle}
                  </Text>

                  <Text style={{ fontSize: 19, color: 'blue', marginBottom: 5 }}>
                    ₹{deal.discountPercentage}% Off
                  </Text>

                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 0 }}>
                    <Text style={{ fontSize: 22, color: 'black' }}>
                      ₹{Math.round(deal.dealPrice)}
                    </Text>
                    <Text style={{ textDecorationLine: 'line-through', color: 'gray', marginLeft: 5,fontSize: 18 }}>
                      ₹{deal.mrp}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        )}
        </View>
      
      
      
      
      </ScrollView>
        {isLoading && (
    <View style={{ position: 'relative', top: '50%', left: '50%', marginLeft: -25, marginTop: -25, zIndex: 1 }}>
      <ActivityIndicator animating={true} color={MD2Colors.red800} />
    </View>
  )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    padding: 16,
    height: '50%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  radioButtonContainer: {
    marginTop: 10,
  },
});

export default DealsList;
