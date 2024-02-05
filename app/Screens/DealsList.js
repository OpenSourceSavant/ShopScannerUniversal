import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, Text, TouchableOpacity, Image, View } from 'react-native';
import { Button, Chip } from 'react-native-paper';
import {db} from '..//..//firebaseConfig'; // Adjust the import according to your Firebase configuration file
import amazonLogo from '..//..//assets/amazon_logo.png';
import flipkartLogo from '..//..//assets/flipkart_logo.png';
import { collection, getDocs, query, orderBy, limit,startAfter } from 'firebase/firestore';
import { Appbar } from 'react-native-paper';

const DealsList = () => {

  const containerRef = useRef();

  const [deals, setDeals] = useState([]);
  const [isMoreDataAvailable, setIsMoreDataAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);



  const handleDealClick = (url) => {
    // Handle click logic
  };



  const MadeWithLove = () => (
    <View style={{ textAlign: 'center', marginTop: '50px', color: '#888', marginBottom: '50px' }}>
      <Text>Made with ❤️ in India</Text>
    </View>
  );





  const fetchDeals = async () => {

    if (isLoading) {
        return; // Do nothing if already loading
      }
  
      setIsLoading(true);
  
    let dealsQuery;    
    console.log('lastVisible',lastVisible);
    console.log('isMoreDataAvailable',isMoreDataAvailable);
    if (lastVisible && isMoreDataAvailable){

      console.log('fetching deals again')

      dealsQuery = query(collection(db, 'deals'), orderBy('dealTime', 'desc'),startAfter(lastVisible), limit(10));
    

    try {
      const querySnapshot = await getDocs(dealsQuery);
      const dealsData = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
      
      if (!querySnapshot.empty && querySnapshot.docs.length > 0) {
        console.log('setting last visible',querySnapshot.docs.length - 1)
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1])
      } else {
        setIsMoreDataAvailable(false);
      }
      
      setDeals((prevDeals) => [...prevDeals, ...dealsData]);
    } catch (error) {
      console.error('Error fetching deals:', error);
    }
    finally {
        setIsLoading(false);
      }




    }
    else if(!lastVisible && isMoreDataAvailable){

  
      // Default query
      dealsQuery = query(collection(db, 'deals'), orderBy('dealTime', 'desc'), limit(10));
    

    try {
      const querySnapshot = await getDocs(dealsQuery);
      const dealsData = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
      
      
      if (!querySnapshot.empty && querySnapshot.docs.length > 0) {
        console.log('setting last visible',querySnapshot.docs.length - 1)
        setLastVisible( querySnapshot.docs[querySnapshot.docs.length - 1]);

        // Filter dealsData based on the condition that "Tags" array contains "Electronics"

      } else {
        setIsMoreDataAvailable (false);
      }
      
      setDeals(dealsData);
    } catch (error) {
      console.error('Error fetching deals:', error);
    }
    finally {
        setIsLoading(false);
      }
  }
};

const handleScroll = ({ nativeEvent: { contentOffset: { y }, contentSize, layoutMeasurement } }) => {
    const scrollThreshold = 200;
    const isBottom = y >= contentSize.height - layoutMeasurement.height - scrollThreshold;
    console.log('scrolled at', isBottom, isMoreDataAvailable)
    if (isBottom && isMoreDataAvailable) {
      fetchDeals();
    }
  };
  




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
  }, [isMoreDataAvailable]);


  const timeAgo = (firestoreTimestamp) => {
    // Time ago logic
  };


  return (

    <View style={{flex:1}}>
    <Appbar.Header style={{ height: 55,backgroundColor:'#fff' }}>
    <Appbar.Content title="Shop Scanner" style={{}} />
    </Appbar.Header>

    <ScrollView style={{ flex: 1 }} onScroll={handleScroll} scrollEventThrottle={50}>
   

     

      {/* Deals Section */}
      <View>
        {deals.map((deal) => (
          <TouchableOpacity
            key={deal.dealId}
            onPress={() => handleDealClick(deal.storeUrl)}
            style={{ width: '100%', height: 150, marginBottom: 1 }}
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
                      width: 30,
                      height:10,
                      objectFit: 'contain',
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
                <Text style={{ textAlign: 'right', fontSize: 12 }}>
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

                <Text style={{ fontSize: 16, color: 'blue', marginBottom: 0 }}>
                  ₹{deal.discountPercentage}% Off
                </Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 0 }}>
                  <Text style={{ fontSize: 18, color: 'black' }}>
                    ₹{Math.round(deal.dealPrice)}
                  </Text>
                  <Text style={{ textDecorationLine: 'line-through', color: 'gray', marginLeft: 5 }}>
                    ₹{deal.mrp}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <MadeWithLove />
    </ScrollView>

    </View>
  );
};

export default DealsList;
