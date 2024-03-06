  import React, { useState, useEffect, useRef } from 'react';
  import { ScrollView, Text, TouchableOpacity, Image, View,TouchableWithoutFeedback,Modal,StyleSheet,Dimensions} from 'react-native';
  import {db} from '../../firebaseConfig'; // Adjust the import according to your Firebase configuration file
  import amazonLogo from '..//..//assets/amazon_logo.png';
  import flipkartLogo from '..//..//assets/flipkart_logo.png';
  import { collection, getDocs, query, orderBy, limit,startAfter, where } from 'firebase/firestore';
  import { ActivityIndicator, MD2Colors,Appbar,Chip,Button,RadioButton,Snackbar} from 'react-native-paper';
  import { Linking } from 'react-native';
  import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';
  import { useLocalSearchParams,router } from "expo-router";
  import { debounce } from 'lodash';
  import FilterScreen from './FilterScreen';
  import backIcon from '..//..//assets/left-arrow.png'; // Replace with the correct path
  import logo from '..//..//assets/icon.png'; // Replace with the correct path
  import FlipkartLogo from '..//..//assets/flipkart_logo.png';
  import AmazonLogo from '..//..//assets/amazon_logo.png';
  import MyntraLogo from '..//..//assets/myntra_logo.png';
  import NykaaLogo from '..//..//assets/nykaa_logo.png';
  import AjioLogo from '..//..//assets/ajio_logo.png';
  
  const DealsList = () => {

    const containerRef = useRef();
    const screenHeight = Dimensions.get('window').height;


    const [deals, setDeals] = useState([]);
    const [isMoreDataAvailable, setIsMoreDataAvailable] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [lastVisible, setLastVisible] = useState(null);
    const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [filterScreenVisible, setIsFilterScreenVisible] = useState(false);
    const [sortOptionChanged, setSortOptionChanged] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [initialFetchDone, setInitialFetchDone] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const tagsObject = useLocalSearchParams().tags;
    
    const [selectedDiscountValue, setSelectedDiscountValue] = useState(0); // Store selected filters here
    const [filterChanged, setfilterChanged] = useState(false);

    // Check if tagsObject is a string and has values
    const tags = typeof tagsObject === 'string' && tagsObject !== null
    ? tagsObject.split(',')
    : [];

    const storeImages = {
      flipkart: FlipkartLogo,
      amazon: AmazonLogo,
      myntra:MyntraLogo,
      nykaa:NykaaLogo,
      ajio:AjioLogo
      // Add more stores if needed
    };


    const initialChipData = [
      { label: 'Rising Stars', icon: 'star' },
      { label: 'Hot Discounts', icon: 'heart' },
      { label: 'Category 3', icon: 'circle' },
      // Add more chip data as needed
    ];
    const [chipData, setChipData] = useState(initialChipData);
    const [selectedChip, setSelectedChip] = useState(null);


    const handleChipPress = (label) => {
      // Handle chip press logic
      console.log('Chip pressed:', label);
      setSelectedChip(label);
    };


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
      router.replace('MobileStack');

      
    };

    const showBottomSheet = () => setBottomSheetVisible(true);

   
    
    const hideBottomSheet = () => {
      setBottomSheetVisible(false);
    };


    const handleSortOptionPress = async (option) => {

      
      setSnackbarMessage(`sort ${option} selected`);
      setIsSnackbarVisible(true);
      setSelectedOption(option);
      setSortOptionChanged(true); // Set sortOptionChanged to true when the sort option changes
      setLastVisible(null);
      console.log(lastVisible)
      console.log(selectedOption)
      hideBottomSheet();

      
    };
    
  
    
    const fetchDeals = async () => {
      setIsLoading(true);

      try {
        let dealsQuery;
        const orderField = selectedOption || 'dealTime';
        const hasDiscountFilter = false;

        console.log('hasDiscountFilter',hasDiscountFilter);
        console.log('orderField->',orderField)
        if (lastVisible && isMoreDataAvailable ) {
          dealsQuery = query(
            collection(db, 'deals'),
            ...(tags && tags.length > 0 ? [where('Tags', 'array-contains-any', tags)] : []),
            ...(hasDiscountFilter
              ? [
                  where('discountPercentage', '>', 90), // Additional condition when hasDiscountFilter is true
                  orderBy('discountPercentage', 'desc'),
                ]
              : []), // Only include when the filter is applied            orderBy(orderField, 'desc'),
            startAfter(lastVisible),
            limit(10)
          );
         


        } else {
          // Default query
          dealsQuery = query(
            collection(db, 'deals'),
            ...(tags && tags.length > 0 ? [where('Tags', 'array-contains-any', tags)] : []),
            ...(hasDiscountFilter
              ? [
                  where('discountPercentage', '>', 90), // Additional condition when hasDiscountFilter is true
                  orderBy('discountPercentage', 'desc'),
                ]
              : []), // Only include when the filter is applied            orderBy(orderField, 'desc'),
            limit(10)

          );

          console.log('DEALS QUERY WITHOUT LAST VISIBLE')
        }
    
        console.log('dealsQuery:', dealsQuery);
    
        const querySnapshot = await getDocs(dealsQuery);
    
        console.log('querySnapshot:', querySnapshot);
    
        if (!querySnapshot.empty && querySnapshot.docs.length > 0) {
          // Reset deals state if it's a new sort or the initial fetch
          if (!lastVisible) {
            setDeals(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
          } else {
            // Append new deals to the existing list
            setDeals((prevDeals) => {
              // Map new deals from querySnapshot.docs
              const newDeals = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
              
              // Filter out duplicates based on dealId
              const uniqueNewDeals = newDeals.filter((newDeal) => {
                return !prevDeals.some((prevDeal) => prevDeal.dealId === newDeal.dealId);
              });
            
              // Combine previous deals with unique new deals
              return [...prevDeals, ...uniqueNewDeals];
            });
            
            
            console.log('##################################################')
          }
          setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);

        } else {
          setIsMoreDataAvailable(false);
        }
      } catch (error) {
        console.error('Error fetching deals:', error);
        // Handle other errors (show an error message, set an error state, etc.)
      } finally {
        setIsLoading(false);
      }
    };



    const handleScroll = ({ nativeEvent: { contentOffset: { y }, velocity, contentSize, layoutMeasurement } }) => {
      const scrollThreshold = 250;
      const isBottom = y >= contentSize.height - layoutMeasurement.height - scrollThreshold;

      if (isBottom && isMoreDataAvailable && !isLoading) {
        console.log('############FETCHING DEALS ON SCROLL##############')
        fetchDeals();
      }

      

      };




  


    useEffect(() => {
  
      

      if (!initialFetchDone || sortOptionChanged || filterChanged) {
        setLastVisible(null); // Set lastVisible to null if the sort option has changed
        console.log('last visible now',lastVisible);
        console.log('selected option',selectedOption);
        console.log('selectedDiscountValue',selectedDiscountValue);
        fetchDeals();
        setSortOptionChanged(false); // Reset sortOptionChanged after fetching deals
        setInitialFetchDone(true);
        setfilterChanged(false);
      }

     
    }, [isMoreDataAvailable, selectedOption,sortOptionChanged,isLoading,lastVisible,filterChanged]);


    


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

    const handleCloseFilterScreen = () => {
      setIsFilterScreenVisible(false);
    };

    const handleFilterApply = (selectedDiscountValue) => {
      console.log("Selected Discount Value:", selectedDiscountValue); // Log selected discount value to console
      setSelectedDiscountValue(selectedDiscountValue); // Update the state with the selected discount value
      setfilterChanged(true);
      setIsFilterScreenVisible(false); // Hide the filter screen
    };
    


    return (

      <View style={{flex:1}}>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', elevation: 3, height: 70 }}>
            <TouchableOpacity onPress={handleBackPress} style={{ padding: 10 }}>
              <Image source={backIcon} style={{ width: 24, height: 24, margin: 0 }} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 'auto' }}>
              <Image source={logo} style={{ width: 64, height: 64, marginRight: 5 }} />
            </View>
        </View>

              
  

          {!filterScreenVisible  && (
            <View style={{flex:1}}>
              <ScrollView style={{ flex: 1 }} onScroll={handleScroll} scrollEventThrottle={200  } >

                
                <View style={{ flexDirection: 'row', padding: 10, maxHeight: 90, display: 'none'}}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', padding: 10, maxHeight: 70 }}>
                      {chipData.map((chip, index) => (
                        <Chip
                          key={index}
                          mode="outlined"
                          onPress={() => handleChipPress(chip.label)}
                          selected={selectedChip === chip.label}
                          style={{
                            margin: 5,
                            borderColor: selectedChip === chip.label ? 'blue' : '#ccc',
                            borderRadius: 20,
                          }}
                          textStyle={{ color: selectedChip === chip.label ? 'blue' : 'black' }}
                        >
                          {chip.label}
                        </Chip>
                      ))}
                    </ScrollView>
                </View>

                <View>
                  <Image 
                      source={{ uri: 'https://assets.ajio.com/cms/AJIO/MOBILE/M-1.0-UHP-15022024-JIT-DAZZLINGDISCOUNTS-header.jpg' }}
                      style={{ width: '100%', height: 90,opacity:0.85,display:'none'}}
                  />
                </View>

                        
                  
                <View style={{ flex: 1 }}>
                  {deals.length === 0 ? (
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>No deals available</Text>
                  </View>
                ) : (
                  // Deals Section
                <View style={{flex:1,maxWidth:'100%', margin: 9}}>
                  {deals.map((deal) => (
                    <TouchableOpacity
                      key={deal.dealId}
                      onPress={() => handleDealClick(deal.storeUrl)}
                      style={{ width: '100%', height: 150,backgroundColor:'#fff',marginBottom:9 }}
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
                            width:90,
                            height:90,
                            resizeMode: 'contain', // Add this line
                            marginRight: 10,
                            
                        }}
                      />
                    </View>
                  </View>

                        {/* Content for the second div */}
                        <View style={{ width: '65%', backgroundColor: '#fff' }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                         
                          <Text style={{ textAlign: 'right', fontSize: 12, marginBottom: 10, fontFamily: 'sans-serif' }}>
                            {timeAgo(deal.dealTime)}
                          </Text>
                        </View>


                          <Text 
                          numberOfLines={1}
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

               {/* ######################################SORT AND FILTER BAR ###################################### */}
               <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 60, elevation: 0, borderTopWidth: 0.9, borderTopColor: '#dfdfdf' }}>
              {/* Sort Button */}
              <TouchableWithoutFeedback onPress={showBottomSheet} style={{height:60}} >
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',height:60 }}>
                  <Image source={require('../../assets/user.png')} style={{ width: 24, height: 24 }} />
                  <Text style={{ fontWeight: '400', marginLeft: 5, color: '#0f0f0f',fontFamily:'Poppins-SemiBold' }}>Sort</Text>
                </View>
              </TouchableWithoutFeedback>

              {/* Divider */}
              <View style={{ height: 50, width: 1.2, backgroundColor: '#d3d3d3' }} />


              {/* Filter Button */}

              <TouchableWithoutFeedback onPress={() => setIsFilterScreenVisible(true)} style={{height:60}}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Image source={require('../../assets/filter.png')} style={{ width: 24, height: 24 }} />
                  <Text style={{ fontWeight: '400', marginLeft: 5, color: '#000',fontFamily:'Poppins-SemiBold' }}>Filter</Text>
                </View>
              </TouchableWithoutFeedback>



            

              <Modal
              transparent={true}
              animationType="slide"
              visible={bottomSheetVisible}>
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
                        <RadioButton.Item label="Sort by Price (High to Low)" value="dealPrice" />
                        <RadioButton.Item label="Sort by Discount (High to Low)" value="discountPercentage" />
                        {/* Add more sorting options as needed */}
                      </View>
                    </RadioButton.Group>
                  </View>
                </View>
              </View>
              </Modal>

            
      

              </View>
            </View> 
          )}      
          
          {filterScreenVisible &&
          <Modal
            isVisible={filterScreenVisible}
            animationType="slide"
            style={{flex:1}}
            onBackdropPress={() => setIsFilterScreenVisible(false)}>
            <View style={{flex:1,height:screenHeight}}>
              <FilterScreen onClose={handleCloseFilterScreen} onApply={handleFilterApply}  selectedDiscountValue={selectedDiscountValue}
/>
            </View>
          </Modal>
          }
          
          
          {!isLoading && <Snackbar
            visible={isSnackbarVisible}
            onDismiss={() => setIsSnackbarVisible(false)}
            duration={2000}>
            {snackbarMessage}
          </Snackbar>}



         {/* 
          {isLoading && (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ position: 'absolute'}}>
                <ActivityIndicator animating={true} color={MD2Colors.red800} />
              </View>
              <Text style={{ marginTop: 30, color: '#555555', fontSize: 16 }}>Discover savings, Shop Scanner awaits you!</Text>
            </View>
          )}
        */}






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
      right: 20,
    },
    closeButtonText: {
      fontSize: 28,
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
