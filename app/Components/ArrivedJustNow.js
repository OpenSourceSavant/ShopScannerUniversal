import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Linking, Platform, Image,StyleSheet} from 'react-native';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';

import { db } from '../../firebaseConfig';

import FlipkartLogo from '../../assets/flipkart_logo.png';
import AmazonLogo from '../../assets/amazon_logo.png';
import MyntraLogo from '../../assets/myntra_logo.png';
import NykaaLogo from '../../assets/nykaa_logo.png';
import AjioLogo from '../../assets/ajio_logo.png';
import ZivameLogo from '../../assets/zivame_logo.png';
import TiraLogo from '../../assets/tira_logo.png';
import SaleImage from '../../assets/sale.png';

if (Platform.OS === 'android' ||Platform.OS === 'ios') {
  FastImage = require('react-native-fast-image');
}


const storeImages = {
  flipkart: FlipkartLogo,
  amazon: AmazonLogo,
  myntra: MyntraLogo,
  nykaa: NykaaLogo,
  ajio: AjioLogo,
  zivame: ZivameLogo,
  tira: TiraLogo,
};

const ArrivedJustNow = () => {
  const [deals, setDeals] = useState([]);

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
   
      console.log(url);
      
        await Linking.openURL(url);
    
  };



  return (
    <View style={{paddingLeft:10,paddingTop:10, backgroundColor:'#fff'}}>
      
      <View style={styles.lineContainer}>
            <LinearGradient
                      colors={['#e0e0e0', '#000']}
                      style={styles.line}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}/>
            <Text style={styles.title}>ALL TIME SALE</Text>
            <LinearGradient
                        colors={['#000', '#e0e0e0']}
                        style={styles.line}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}/>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Image
          style={{ height: 270,width:185,resizeMode:'contain',borderRadius: 6, }}
          source={SaleImage}
        />

        {deals.map((deal, index) => (
          <TouchableOpacity
            key={deal.id}
            onPress={() => handleClick(deal.storeUrl)}
            style={{
              width: 185,
              height: 270,
              marginLeft: 10,
              padding:7,
              flexShrink: 0,
              backgroundColor: '#fff', // Add background color
              borderRadius: 6,
              borderWidth: 0.9, // Add border width
              borderColor: '#dfdfdf', // Add border color
            }}
          >
            {/* Top bar with store logo and favorite icon */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', position: 'relative', height: 25}}>
              {Platform.OS === 'web' ? (
                <Image
                  style={{ width:40, maxWidth: 70, height: 30 }}
                  source={storeImages[deal.store]}
                  resizeMode='contain'            
                />
              ) : (
                <FastImage
                  style={{ width:42, maxWidth: 75, height: 30 }}
                  source={storeImages[deal.store]}
                  resizeMode={FastImage.resizeMode.contain}            
                />
              )}

              <Text style={{ fontWeight: '400', fontSize: 10, textAlign: 'right',marginRight:8 }}>{timeAgo(deal.dealTime)}</Text>
            </View>

            {/* Deal image and details */}
            <FastImage
              style={{ height: 100,marginTop:10 }}
              source={{ uri: deal.imageUrl }}
              alt={deal.productTitle}
              resizeMode={FastImage.resizeMode.contain}
            />

            <View style={{ justifyContent: 'space-between', padding: 10 }}>
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
              <Text style={{ color: '#00BF15', fontWeight: '500', textAlign: 'left',fontSize:18,marginTop:4 }}>{deal.discountPercentage}% Off</Text>

              {/* Deal price and MRP */}
              <View style={{ marginTop: 4, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontWeight: '500', color: '#FF0000', fontSize: 20 }}>₹{parseInt(deal.dealPrice)}</Text>
                <View style={{ marginHorizontal: 10 }}>
                  <Text style={{ textDecorationLine: 'line-through', fontSize: 17 }}>₹{parseInt(deal.mrp)}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  scrollViewContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
    height:267
  },
  logoContainer: {
    marginRight: 10,
    borderRadius: 10,
    borderColor: '#ECB5CF',
    height:240,
    width:150,
    borderWidth: 0.4,
    overflow: 'hidden',
    marginTop:25 // Ensure that the overflow is hidden to clip the LinearGradient
  },
  gradient: {
    width: 150,
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 110,
    height: 80,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: 'Roboto',
    paddingBottom: 5,
    paddingLeft:15,
    paddingRight:15,
    paddingTop:5,
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 14,
    color: '#e91e63', // Pink theme color
    textTransform: 'uppercase', // Modern style
    letterSpacing: 1.2, // Adds spacing between letters for a modern look
    backgroundColor: 'rgba(233, 30, 99, 0.1)', // Light pink background to highlight the title
    paddingVertical: 10, // Add vertical padding for better readability
    borderRadius: 8, // Slightly rounded corners
    overflow: 'hidden', // Ensure rounded corners are clipped
  },  
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:20
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#000',
    marginLeft:10,
    marginRight:10
    
  },
});

export default ArrivedJustNow;
