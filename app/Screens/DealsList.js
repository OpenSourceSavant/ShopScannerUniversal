  import React, { useState, useEffect, useRef } from 'react';
  import { ScrollView, Text, TouchableOpacity, Image, View,TouchableWithoutFeedback,Modal,StyleSheet,Dimensions,Platform} from 'react-native';
  import {db} from '../../firebaseConfig'; // Adjust the import according to your Firebase configuration file
  import amazonLogo from '..//..//assets/amazon_logo.png';
  import flipkartLogo from '..//..//assets/flipkart_logo.png';
  import { collection, getDocs, query, orderBy, limit,startAfter, where } from 'firebase/firestore';
  import { ActivityIndicator, MD2Colors,Appbar,Chip,Button,RadioButton,Snackbar} from 'react-native-paper';
  import { Linking } from 'react-native';
  import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';
  import { useLocalSearchParams,router,useNavigation } from "expo-router";
  import { debounce } from 'lodash';
  import FilterScreen from './FilterScreen';
  import backIcon from '..//..//assets/left-arrow.png'; // Replace with the correct path
  import logo from '..//..//assets/icon.png'; // Replace with the correct path
  import FlipkartLogo from '..//..//assets/flipkart_logo.png';
  import AmazonLogo from '..//..//assets/amazon_logo.png';
  import MyntraLogo from '..//..//assets/myntra_logo.png';
  import NykaaLogo from '..//..//assets/nykaa_logo.png';
  import AjioLogo from '..//..//assets/ajio_logo.png';
  import ZivameLogo from '..//..//assets/zivame_logo.png';
  import TiraLogo from '..//..//assets/tira_logo.png';



  const DealsList = () => {

    const screenHeight = Dimensions.get('window').height;
    const [deals, setDeals] = useState([]);
    const [isMoreDataAvailable, setIsMoreDataAvailable] = useState(true);
    const [lastVisible, setLastVisible] = useState(null);
    const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [initialFetchDone, setInitialFetchDone] = useState(false);
    const [selectedSortOption, setSelectedSortOption] = useState(null);
    const [sortOptionChanged, setSortOptionChanged] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [filterScreenVisible, setIsFilterScreenVisible] = useState(false);
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [selectedDiscountOptions, setSelectedDiscountOptions] = useState([]);
    const [filterChanged, setfilterChanged] = useState(false);

    const navigation = useNavigation();


    const showBottomSheet = () => setBottomSheetVisible(true);
    const hideBottomSheet = () => {
      setBottomSheetVisible(false);
    };

    const tagsObject = useLocalSearchParams().tags;
    const lastRoute = useLocalSearchParams().lastRoute;
    const initialRouteSubCategory = useLocalSearchParams().initialRouteSubCategory;
    // Check if tagsObject is a string and has values
    const tags = typeof tagsObject === 'string' && tagsObject !== null
    ? tagsObject.split(',')
    : [];

    console.log('lastRoute',lastRoute)

    const storeImages = {
      flipkart: FlipkartLogo,
      amazon: AmazonLogo,
      myntra:MyntraLogo,
      nykaa:NykaaLogo,
      ajio:AjioLogo,
      zivame:ZivameLogo,
      tira:TiraLogo

      // Add more stores if needed
    };

    const handleDealClick = async (url) => {
      try {
        await Linking.openURL(url);
      } catch (err) {
        console.error('Error opening URL:', err);
      }
    };

    const handleBackPress = () => {
      // Determine the target stack based on the platform
      const isMobileWeb = Platform.OS === 'web' && window.innerWidth <= 768; // Adjust the width as needed
    
      const targetStack = isMobileWeb ? 'MobileWebStack' : 'MobileStack';
      // Replace the route with the target stack
      //router.replace(targetStack);
      const navigationParams = {
        pathname: 'MobileWebStack',
      };
      
      if (lastRoute) {
        navigationParams.params = {
          lastRoute: lastRoute,
          initialRouteSubCategory:initialRouteSubCategory
        };
      }
      
      router.replace(navigationParams);
    };


    const fetchDeals = async () => {
      setIsLoading(true);

      try {
        let dealsQuery;
        let filterConditions=[];
        const orderField = selectedSortOption || 'dealTime';
        console.log('ORDER FIELD',orderField);
        console.log(selectedDiscountOptions);
        let hasDiscountFilter = false;
        if (selectedDiscountOptions.length>0){
          console.log('Setting hasDiscountFilter to true');

          hasDiscountFilter=true;
        }

        
        if (hasDiscountFilter) {
          if (selectedDiscountOptions.includes('90% and above')) {
            filterConditions.push(where('discountPercentage', '>=', 90));
          } else if (selectedDiscountOptions.includes('80% and above')) {
            filterConditions.push(where('discountPercentage', '>=', 80));
          } // Add more conditions for other options as needed
          else if (selectedDiscountOptions.includes('70% and above')) {
            filterConditions.push(where('discountPercentage', '>=', 70));
          } // Add more conditions for other options as needed


          // If both options are selected, prioritize the higher one

          console.log(filterConditions)
          filterConditions.push(orderBy('discountPercentage', 'desc'));
        }

        console.log(hasDiscountFilter)
        console.log('Last Visible',lastVisible);
        if (lastVisible && isMoreDataAvailable ) {
          dealsQuery = query(
            collection(db, 'deals'),
            ...(tags && tags.length > 0 ? [where('Tags', 'array-contains-any', tags)] : []),
            ...filterConditions,
            orderBy(orderField, 'desc'),

            startAfter(lastVisible),
            limit(10)
          );
         


        } else {
          // Default query
          dealsQuery = query(
            collection(db, 'deals'),
            ...(tags && tags.length > 0 ? [where('Tags', 'array-contains-any', tags)] : []),
            ...filterConditions,
            orderBy(orderField, 'desc'),
            limit(10)

          );

          console.log('DEALS QUERY WITHOUT LAST VISIBLE')
        }
    
        
        const querySnapshot = await getDocs(dealsQuery);
        
    
        if (!querySnapshot.empty && querySnapshot.docs.length > 0) {
          // Reset deals state if it's a new sort or the initial fetch
          if (!lastVisible) {
            console.log('deals adding without last visible');
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

    const handleCloseFilterScreen = () => {
        setIsFilterScreenVisible(false);
      };  
    
    const handleFilterApply = (selectedDiscountOptions) => {
        console.log("Selected Discount Options:", selectedDiscountOptions); // Log selected discount value to console
        setSelectedDiscountOptions(selectedDiscountOptions); // Update the state with the selected discount value
        setfilterChanged(true);
        setIsFilterScreenVisible(false); // Hide the filter screen
      };

      const handleSortOptionPress = async (option) => {
        //setSnackbarMessage(`sort ${option} selected`);
        //setIsSnackbarVisible(true);
        setSelectedSortOption(option);
        setSortOptionChanged(true); // Set sortOptionChanged to true when the sort option changes
        setLastVisible(null);
        console.log(lastVisible)
        console.log(selectedSortOption)
        hideBottomSheet();
  
        
      };  
      
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

    
    useEffect(() => {

      if (!initialFetchDone || sortOptionChanged ||filterChanged ) {
        setLastVisible(null);
        if(lastVisible==null)
          {
          console.log('fetch deals is running now Hurrayyy')
          fetchDeals();
          setSortOptionChanged(false); // Reset sortOptionChanged after fetching deals
          setInitialFetchDone(true);
          setfilterChanged(false)
          }
      }
  
       
      }, [isMoreDataAvailable, selectedSortOption,sortOptionChanged,isLoading,lastVisible,filterChanged,selectedDiscountOptions,setDeals]);


    return (

      <View style={{flex:1}}>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', elevation: 3, height: 70 }}>
            <TouchableOpacity onPress={handleBackPress} style={{ padding: 10 }}>
              <Image source={backIcon} style={{ width: 24, height: 24, margin: 0 }} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 'auto' }}>
              <TouchableOpacity onPress={handleBackPress} >

              <Image source={logo} style={{ width: 64, height: 64, marginRight: 5 }} />
              </TouchableOpacity>
            </View>
        </View>

              
  

          {!filterScreenVisible  && (
            <View style={{flex:1}}>
              <ScrollView style={{ flex: 1 }} onScroll={handleScroll} scrollEventThrottle={200  } >

                
                <View style={{ flexDirection: 'row', padding: 10, maxHeight: 90, display: 'none'}}>
                   
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
                <View style={{flex:1,maxWidth:'100%', margin: 7}}>
                  {deals.map((deal) => (
                    <TouchableOpacity
                      key={deal.dealId}
                      onPress={() => handleDealClick(deal.storeUrl)}
                      style={{ width: '100%', height: 155,backgroundColor:'#fff',marginBottom:6 }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          height: '100%',
                        
                          borderWidth: 1,
                          borderColor: '#d3d3d3',
                          borderRadius: 3,
                        }}
                      >
                        {/* Content for the first div */}
                        <View style={{ width: '35%', flexDirection: 'column' }}>
                          
                    
                    <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',padding:10 }}>
                      <Image
                        source={{ uri: deal.imageUrl }}
                        style={{
                            width:'100%',
                            height:'100%',
                            resizeMode: 'contain', // Add this line
                            marginRight: 10,
                            
                        }}
                      />
                    </View>
                  </View>

                        {/* Content for the second div */}
                        <View style={{ width: '65%', backgroundColor: '#fff',  padding: 10 }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',paddingBottom:10 }}>
                         
                          <Text style={{ textAlign: 'right', fontSize: 12,  fontFamily: 'sans-serif' }}>
                            {timeAgo(deal.dealTime)}
                          </Text>

                          <Image
                        source={storeImages[deal.store]}
                        style={{
                          width: 40,
                          height:13,
                          resizeMode: 'contain',
                          
                        }}
                      />
                        </View>


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
                      value={selectedSortOption}
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
              <FilterScreen onClose={handleCloseFilterScreen} onApply={handleFilterApply}  propSelectedDiscountOptions={selectedDiscountOptions}
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
