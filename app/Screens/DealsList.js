  import React, { useState, useEffect, useRef } from 'react';
  import { ScrollView, Text, TouchableOpacity, Image, View,TouchableWithoutFeedback,Modal,StyleSheet,Dimensions,Platform,RefreshControl,BackHandler} from 'react-native';
  import {db} from '../../firebaseConfig'; // Adjust the import according to your Firebase configuration file
  import amazonLogo from '..//..//assets/amazon_logo.png';
  import flipkartLogo from '..//..//assets/flipkart_logo.png';
  import { collection, getDocs, query, orderBy, limit,startAfter, where } from 'firebase/firestore';
  import { ActivityIndicator, Dialog,Portal,Button,RadioButton,Snackbar,PaperProvider} from 'react-native-paper';
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
  import VerifiedImage from '..//..//assets/verified.png';
  import downdiscount from '..//..//assets/downdiscount.png';
  import { StatusBar } from 'expo-status-bar';
  import LottieView from 'lottie-react-native';

if (Platform.OS === 'android' || Platform.OS === 'ios') {
  FastImage = require('react-native-fast-image');
}

const { height: screenHeight } = Dimensions.get('window');

const DealsList = ({route}) => {

    const screenHeight = Dimensions.get('window').height;
    const [deals, setDeals] = useState([]);
    const [isMoreDataAvailable, setIsMoreDataAvailable] = useState(true);
    const [lastVisible, setLastVisible] = useState(null);
    const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [initialFetchDone, setInitialFetchDone] = useState(false);
    const [selectedSortOption, setSelectedSortOption] = useState(null);
    const [sortOptionChanged, setSortOptionChanged] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [filterScreenVisible, setIsFilterScreenVisible] = useState(false);
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [selectedDiscountOptions, setSelectedDiscountOptions] = useState([]);
    const [filterChanged, setfilterChanged] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    

    const navigation = useNavigation();
    const windowHeight = Dimensions.get('window').height;
    
    const tabbed = route?.params?.tabbed;
    console.log(tabbed)

    const translateY = useSharedValue(windowHeight);

    const showBottomSheet = () => setBottomSheetVisible(true);
    const hideBottomSheet = () => {
      setBottomSheetVisible(false);
      console.log("Hide Bottom Sheet Pressed")
    };

    const tagsObject = useLocalSearchParams().tags;

    const lastRoute = useLocalSearchParams().lastRoute;

    
    const initialRouteSubCategory = useLocalSearchParams().initialRouteSubCategory;
    const tags = typeof tagsObject === 'string' && tagsObject !== null
    ? tagsObject.split(',')
    : [];

    console.log('Last Route in Deals List',lastRoute);

    console.log('lastRoute',lastRoute)

    const storeImages = {
      flipkart: FlipkartLogo,
      amazon: AmazonLogo,
      myntra:MyntraLogo,
      nykaa:NykaaLogo,
      ajio:AjioLogo,
      zivame:ZivameLogo,
      tira:TiraLogo

    };

    useEffect(() => {
      const backAction = () => {
        console.log("Back button pressed");
        handleBackPress();
        return true; 
      };
  
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
  
      return () => backHandler.remove(); 
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value }],
    }));

    useEffect(() => {
      if (filterScreenVisible) {
        if (tabbed){
        translateY.value = withSpring(150, { damping:15});
        }
        else{
          translateY.value = withSpring(70, { damping:15});
        }
      } else {
        translateY.value = withSpring(screenHeight, { damping: 15 });
      }
    }, [filterScreenVisible]);

    const handleDealClick = async (url) => {



      try {
        await Linking.openURL(url);
      } catch (err) {
        console.error('Error opening URL:', err);
      }
    };

    const handleBackPress = () => {

      console.log('back pressed in deals list')

      if (filterScreenVisible){
      setIsFilterScreenVisible(false);}
      else if(bottomSheetVisible==true){

        setBottomSheetVisible(false)
      

    }

    else{

      const navigationParams = {
        pathname: 'MobileStack',
        params:{lastRoute:lastRoute}
      };
      
      
      if (lastRoute) {
        navigationParams.params = {
          lastRoute: lastRoute,
          initialRouteSubCategory:initialRouteSubCategory
        };
      }
      
      router.navigate(navigationParams);
    }
    };


    const fetchDeals = async () => {

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
          } 

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
    
    const handleRefresh = () => {
      setRefreshing(true);
    };
    

    
    useEffect(() => {

      if (!initialFetchDone || sortOptionChanged ||filterChanged || refreshing) {
        setLastVisible(null);
        console.log('isLoading',isLoading)

        if(lastVisible==null)
          {
          fetchDeals();
          setSortOptionChanged(false); // Reset sortOptionChanged after fetching deals
          setInitialFetchDone(true);
          setfilterChanged(false)
          }

          setIsLoading(false);
          setRefreshing(false);


      }

      
  
       
      }, [isMoreDataAvailable, selectedSortOption,sortOptionChanged,isLoading,lastVisible,filterChanged,selectedDiscountOptions,setDeals,setIsLoading,refreshing]);


    return (

      <View style={{flex:1}}>
        
        <StatusBar backgroundColor='#fff' />

        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', elevation: 3, height: 70 }}>
        {tabbed === undefined && (
  <TouchableOpacity onPress={handleBackPress} style={{ padding: 10 }}>
    <FastImage source={backIcon} style={{ width: 24, height: 24, margin: 0 }} />
  </TouchableOpacity>
)}

            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 'auto' }}>
              <TouchableOpacity >
              <FastImage source={logo} style={{ width: 64, height: 64, marginRight: 5 }} />
              </TouchableOpacity>
            </View>
        </View>

              
  

          {!filterScreenVisible  && (
            <View style={{flex:1,position: 'relative' }}>
              
            
              
              <ScrollView style={{ flex: 1 }} onScroll={handleScroll} scrollEventThrottle={200  } refreshControl={Platform.OS !== 'web' && <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>

              
                
                <View>
                <View style={{ flexDirection: 'row', maxHeight: 90, display: 'none'}}>
                   
                </View>

                <View>
                  <FastImage 
                      source={{ uri: 'https://assets.ajio.com/cms/AJIO/MOBILE/M-1.0-UHP-15022024-JIT-DAZZLINGDISCOUNTS-header.jpg' }}
                      style={{ width: '100%', height: 90,opacity:0.85,display:'none'}}
                  />
                </View>

                        
                  
                <View style={{ flex: 1 }}>
                {deals.length==0? (
                    <View style={{ flex: 1,justifyContent: 'center', alignItems: 'center',height:windowHeight-168 }}>
                      <ActivityIndicator animating={true} color={'#d53b62'} />
                <Text style={{ color: '#555555', fontSize: 16,paddingLeft:40,paddingRight:40,textAlign:'center',marginTop:40}}>Discover savings, Shop Scanner awaits you!</Text>
                      
                    </View>

                ) : (
                  // Deals Section
                <View style={{flex:1,maxWidth:'100%'}}>
                  {deals.map((deal) => (
                      <TouchableOpacity
                      key={deal.dealId}
                      onPress={() => handleDealClick(deal.storeUrl)}
                      style={{ width: '100%', height: 160,backgroundColor:'#fff' }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          height: '100%',
                          borderTopWidth: 0.7, // Adjust the thickness as needed
                          borderColor: '#d3d3d3', // Light grey color
                          
                        }}
                      >
                        {/* Content for the first div */}
                        <View style={{ width: '35%', flexDirection: 'column',padding:10 }}>
          
                               <FastImage
                                 source={{ uri: deal.imageUrl }}
                                 style={{
                                     width:'100%',
                                     height:'100%',
                                     
                                    
                                     
                                 }}
                                 resizeMode={FastImage.resizeMode.contain}
                               />
                        </View>
       
                        {/* Content for the second div */}
                        <View style={{ width: '65%', backgroundColor: '#fff',  padding: 3,paddingRight:10,paddingLeft:5 }}>
       
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',height:'20%',paddingLeft:5 }}>
                         
                          <Text style={{ textAlign: 'right', fontSize: 12,  fontFamily: 'sans-serif' }}>
                            {timeAgo(deal.dealTime)}
                          </Text>
       
                          <FastImage
                              source={storeImages[deal.store]}
                              style={{
                                width: 40,
                                height:13,  
                                          }}
                              resizeMode={FastImage.resizeMode.contain}
                      />
                        </View>
                        <View style={{ height:'80%' }}>
                          <Text
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            style={{
                              fontSize: 13,
                              fontWeight: '400',
                              marginBottom: 8,
                              lineHeight: 16,
                              overflow: 'hidden',
                              marginLeft: 5,
                            }}
                          >
                            {deal.productTitle}
                          </Text>

                          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <Text style={{ fontSize: 20, color: '#00BF15', fontWeight: '500', marginLeft: 5 }}>
                              {deal.discountPercentage}% Off
                            </Text>
                          </View>

                          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingLeft: 5 }}>
                            <Text style={{ fontSize: 22, color: 'black' }}>
                              ₹{Math.round(deal.dealPrice)}
                            </Text>
                            <Text style={{ textDecorationLine: 'line-through', color: 'gray', marginLeft: 12, fontSize: 18 }}>
                              ₹{deal.mrp}
                            </Text>
                          </View>
                        </View>

       
                     
       
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
                )}
                </View>
                </View>
            

              </ScrollView>

              
             

               {/* ######################################SORT AND FILTER BAR ###################################### */}
               <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 60, elevation: 0, borderTopWidth: 0.9, borderTopColor: '#dfdfdf',backgroundColor:'#fff' }}>
              {/* Sort Button */}
              <TouchableWithoutFeedback onPress={showBottomSheet} style={{height:60}} >
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <FastImage source={require('../../assets/user.png')} style={{ width: 18, height: 18 }} />
                  <Text style={{ fontWeight: '400', marginLeft: 5, color: '#0f0f0f' }}>Sort</Text>
                </View>
              </TouchableWithoutFeedback>

              {/* Divider */}
              <View style={{ height: 50, width: 1.2, backgroundColor: '#d3d3d3' }} />


              {/* Filter Button */}

              <TouchableWithoutFeedback onPress={() => setIsFilterScreenVisible(true)} style={{height:60}}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <FastImage source={require('../../assets/filter.png')} style={{ width: 18, height: 18 }} />
                  <Text style={{ fontWeight: '400', marginLeft: 5, color: '#0f0f0f' }}>Filter</Text>
                </View>
              </TouchableWithoutFeedback>



            

              <Modal
              transparent={true}
              animationType="slide"
              visible={bottomSheetVisible}>
              <View style={styles.modalContainer}>
                <View style={styles.bottomSheet}>
                  {/* Close Button */}
                  <View style={{flexDirection:'row'}}>
                

                  {/* Sort Options */}
                  <Text style={styles.title}>Sort Options</Text>

                  <Button  onPress={hideBottomSheet} style={{flex:1,fontSize:21}} compact={true}>
                    Close
                  </Button>
                  </View>
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
          <View
            style={styles.overlay} 
            onBackdropPress={() => handleBackPress()}>
            <Animated.View style={[styles.container, animatedStyle]}>
                <FilterScreen
                  onClose={handleCloseFilterScreen}
                  onApply={handleFilterApply}
                  propSelectedDiscountOptions={selectedDiscountOptions}
                  tabbed={tabbed}
                />
            </Animated.View>
          </View>
          }
          
          
          {!isLoading && <Snackbar
            visible={isSnackbarVisible}
            onDismiss={() => setIsSnackbarVisible(false)}
            duration={2000}>
            {snackbarMessage}
          </Snackbar>}



         







      </View>
    );
  };

  const styles = StyleSheet.create({

    overlay: {
      ...StyleSheet.absoluteFillObject,
    },
  
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
      right: 20
      
    },
    closeButtonText: {
      fontSize: 28,
      fontWeight: 'bold',
    },
    title: {
      fontSize: 18,
      marginBottom: 10,
      marginTop:5,
      fontWeight: 'bold',
      flex:2
    },
    radioButtonContainer: {
      marginTop: 10,
    },

    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: screenHeight,
      backgroundColor: 'white',
    },
  });


  


  export default DealsList;
