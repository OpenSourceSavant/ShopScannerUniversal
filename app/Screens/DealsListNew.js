  import React, { useState, useEffect, useRef } from 'react';
  import { ScrollView, Text, TouchableOpacity, Image, View,TouchableWithoutFeedback,Modal,StyleSheet,RefreshControl,Platform } from 'react-native';
  import {db} from '..//..//firebaseConfig'; // Adjust the import according to your Firebase configuration file
  import { useLocalSearchParams,router } from "expo-router";
  import { collection, getDocs, query, orderBy, limit,startAfter, where } from 'firebase/firestore';
  import amazonLogo from '..//..//assets/amazon_logo.png';
  import flipkartLogo from '..//..//assets/flipkart_logo.png';
  import logo from '..//..//assets/icon.png'; // Replace with the correct path
  import { Linking } from 'react-native';
  import FlipkartLogo from '..//..//assets/flipkart_logo.png';
  import AmazonLogo from '..//..//assets/amazon_logo.png';
  import MyntraLogo from '..//..//assets/myntra_logo.png';
  import NykaaLogo from '..//..//assets/nykaa_logo.png';
  import AjioLogo from '..//..//assets/ajio_logo.png';
  import ZivameLogo from '..//..//assets/zivame_logo.png';
  import TiraLogo from '..//..//assets/tira_logo.png';
  import VerifiedImage from '..//..//assets/verified.png';
  import downdiscount from '..//..//assets/downdiscount.png';
  const DealsList = () => {

    const [deals, setDeals] = useState([]);
    const [isMoreDataAvailable, setIsMoreDataAvailable] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [lastVisible, setLastVisible] = useState(null);
    const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [initialFetchDone, setInitialFetchDone] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const containerRef = useRef();

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


    // Check if tagsObject is a string and has values in params

    const tagsObject = useLocalSearchParams().tags;
      const tags = typeof tagsObject === 'string' && tagsObject !== null
      ? tagsObject.split(',')
      : [];

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

    const fetchDeals = async ({ sortOption } = {}) => {
      
      setIsLoading(true);
      try {
        console.log('Tags  -->',tags);
        let dealsQuery;
        const orderField = sortOption || 'dealTime';
        console.log('orderField->',orderField)
        if (lastVisible && isMoreDataAvailable) {
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
            orderBy(orderField, 'desc'),
            limit(10)
          );
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
          console.log('#######setting last visible ############################')
          setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);

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
      const scrollThreshold = 250;
        const isBottom = y >= contentSize.height - layoutMeasurement.height - scrollThreshold;
  
        if (isBottom && isMoreDataAvailable) {
          fetchDeals();
        }
  
      
  
      };
    
    
    const handleRefresh = () => {
    };

      useEffect(() => {
        const container = containerRef.current;
  
        if (container) {
          container.addEventListener('scroll', fetchDeals);
        }
  
        // Fetch deals only if initialFetchDone is false
      if (!initialFetchDone) {
        fetchDeals();
        setInitialFetchDone(true); // Set initialFetchDone to true after initial fetch
      }
  
        return () => {
          if (container) {
            container.removeEventListener('scroll', fetchDeals);
          }
        };
      }, [isMoreDataAvailable, selectedOption]);  
  

      const handleDealClick = async (url) => {
        try {
          await Linking.openURL(url);
        } catch (err) {
          console.error('Error opening URL:', err);
        }
      };

                

    return (
      <View style={{flex:1,backgroundColor:'#eeeeee'}}>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', elevation: 3, height: 70 }}>
          <Image source={logo} style={{ width: 64, height: 64, marginLeft: 5 }} />
        </View>
      <ScrollView style={{ flex: 1,marginTop:3 }} onScroll={handleScroll} refreshControl={Platform.OS !== 'web' && <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />} >


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
    
                         <Image
                           source={{ uri: deal.imageUrl }}
                           style={{
                               width:'100%',
                               height:'100%',
                               resizeMode: 'contain', // Add this line
                              
                               
                           }}
                         />
                  </View>
 
                  {/* Content for the second div */}
                  <View style={{ width: '65%', backgroundColor: '#fff',  padding: 3,paddingRight:10,paddingLeft:5 }}>
 
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',height:'20%',paddingLeft:10 }}>
                   
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
                  <View style={{ height:'80%' }}>
                    <Text
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={{
                        fontSize: 14,
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
                      <Text style={{ fontSize: 20, color: '#00BF15', fontWeight: '500', marginLeft: 10 }}>
                        {deal.discountPercentage}% Off
                      </Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingLeft: 10 }}>
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







      </ScrollView>
      </View>
      );
    };

  export default DealsList;
