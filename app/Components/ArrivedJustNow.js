import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity,ScrollView,Platform } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '..//..//firebaseConfig';
import { Linking } from 'react-native';

import FlipkartLogo from '..//..//assets/flipkart_logo.png';
import AmazonLogo from '..//..//assets/amazon_logo.png';
import MyntraLogo from '..//..//assets/myntra_logo.png';
import NykaaLogo from '..//..//assets/nykaa_logo.png';
import AjioLogo from '..//..//assets/ajio_logo.png';
import ZivameLogo from '..//..//assets/zivame_logo.png';
import TiraLogo from '..//..//assets/tira_logo.png';



const ArrivedJustNow = () => {
  const [deals, setDeals] = useState([]);

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

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const dealsQuery = query(collection(db, 'deals'), orderBy('dealTime', 'desc'), limit(8));
        const querySnapshot = await getDocs(dealsQuery);

        const fetchedDeals = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setDeals(fetchedDeals);
      } catch (error) {
        console.error('Error fetching deals:', error);
      }
    };

    fetchDeals();
  }, []);

  const timeAgo = (firestoreTimestamp) => {
    const dealDate = new Date(firestoreTimestamp.seconds * 1000);
    const now = new Date();
    const differenceInSeconds = Math.round((now - dealDate) / 1000);
    const minutes = Math.round(differenceInSeconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);

    if (differenceInSeconds < 60) {
      return `${differenceInSeconds} seconds ago`;
    } else if (minutes < 60) {
      return `${minutes} mins ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      return `${days} days ago`;
    }
  };



  const handleClick = async (url) => {
    try {
      console.log(url)
      const supported = await Linking.canOpenURL(url);
  
      if (supported) {
        if (Platform.OS === 'ios') {
          // For iOS, try opening the Amazon app
          await Linking.openURL('amzn://app');
        } else {
          // For other platforms, open the URL and fallback to the browser
          await Linking.openURL(url);
        }
      } else {
        console.error(`Unable to open URL: ${url}`);
      }
    } catch (err) {
      console.error('Error handling URL:', err);
    }
  };

  return (
    <View style={{padding:10,backgroundColor:'#f5f5f5'}}>

<Text style={{ 
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        paddingBottom: 5,
        fontWeight: '700',
        textAlign: 'left',
        marginLeft:5,
        marginBottom:10
   }}>
  ALL TIME SALE
</Text>

    <ScrollView horizontal showsHorizontalScrollIndicator={false}>

    <Image
        style={{ height: 270,width:185,resizeMode:'contain',borderRadius: 6, }}
        source={require('..//..//assets/sale.png')}
        />

      {deals.map((deal, index) => (
        <TouchableOpacity
          key={deal.id}
          onPress={() => handleClick(deal.storeUrl)}
          style={{
            width: 185,
            height: 270,
            marginLeft: 10,
            padding: 5,
            flexShrink: 0,
            backgroundColor: '#fff', // Add background color
            borderRadius: 6,
            borderWidth: 0.9, // Add border width
            borderColor: '#dfdfdf', // Add border color
          }}
        >
          {/* Top bar with store logo and favorite icon */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', position: 'relative', height: 25, marginTop: 5 }}>
            <Image
              style={{ resizeMode:'contain',width:50, maxWidth: 75, height: 35 }}
              source={storeImages[deal.store]}              
            />

        <Text style={{ fontWeight: '400', fontSize: 10, textAlign: 'right',marginRight:8 }}>{timeAgo(deal.dealTime)}</Text>


           
          </View>

          {/* Deal image and details */}
          <Image
            style={{ height: 100, resizeMode: 'contain',marginTop:10 }}
            source={{ uri: deal.imageUrl }}
            alt={deal.productTitle}
          />

          <View style={{ justifyContent: 'space-between', padding: 10 }}>
            {/* Time ago */}

            {/* Product title */}
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{
                fontSize: 14,
                lineHeight: 16,
                fontWeight: 500,
                marginTop: 5,
              }}
            >
              {deal.productTitle}
            </Text>

            {/* Discount percentage */}
            <Text style={{ fontWeight: '500', color: '#FF0000', textAlign: 'left',fontSize:18,marginTop:4 }}>{deal.discountPercentage}% Off</Text>

            {/* Deal price and MRP */}
            <Text style={{marginTop:4}}>
              <Text style={{ fontWeight: '500', color: '#FF0000', fontSize: 20,marginRight:10 }}>₹{parseInt(deal.dealPrice)}</Text>
              {''}
              <Text style={{ textDecorationLine: 'line-through',fontSize: 17}}>₹{parseInt(deal.mrp)}</Text>
            </Text>

            {/* Deal container */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
    </View>
  );
};

export default ArrivedJustNow;
