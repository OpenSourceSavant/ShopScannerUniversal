import React from 'react';
import { View, Text, Image, TouchableOpacity,Linking } from 'react-native';

import FlipkartLogo from '..//..//assets/flipkart_logo.png';
import AmazonLogo from '..//..//assets/amazon_logo.png';
import MyntraLogo from '..//..//assets/myntra_logo.png';
import NykaaLogo from '..//..//assets/nykaa_logo.png';
import AjioLogo from '..//..//assets/ajio_logo.png';
import ZivameLogo from '..//..//assets/zivame_logo.png';
import TiraLogo from '..//..//assets/tira_logo.png';
import VerifiedImage from '..//..//assets/verified.png';
import downdiscount from '..//..//assets/downdiscount.png';

function Hit({ hit }) {

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
  

      const timeAgo = (current_time_str) => {
        // Split the string by space to separate date and time parts
        const [datePart, timePart] = current_time_str.split(' ');
        // Split date and time parts by their respective separators
        const [year, month, day] = datePart.split('-');
        const [hour, minute, second] = timePart.split(':');
    
        // Create a Date object using the parsed components
        const current_time = new Date(year, month - 1, day, hour, minute, second);
    
        const now = new Date();
        const differenceInSeconds = Math.round((now - current_time) / 1000);
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

    const handleDealClick = async (url) => {
      try {
        await Linking.openURL(url);
      } catch (err) {
        console.error('Error opening URL:', err);
      }
    };
    
    




  return (
    <TouchableOpacity
      key={hit.objectID}
      style={{ width: '100%', height: 160, backgroundColor: '#fff' }}
      onPress={() => handleDealClick(hit.storeUrl)}    >
      <View
        style={{
          flexDirection: 'row',
          height: '100%',
          borderTopWidth: 0.4, // Adjust the thickness as needed
          borderColor: '#d3d3d3', // Light grey color
        }}
      >
        {/* Content for the first div */}
        <View style={{ width: '35%', flexDirection: 'column', padding: 10 }}>
          <Image
            source={{ uri: hit.imageUrl }}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain', // Add this line
            }}
          />
        </View>

        {/* Content for the second div */}
        <View style={{ width: '65%', backgroundColor: '#fff', padding: 3, paddingRight: 10, paddingLeft: 5 }}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: '20%', paddingLeft: 10 }}>

          <Text style={{ textAlign: 'right', fontSize: 12,  fontFamily: 'sans-serif' }}>
                            {timeAgo(hit.dealTime)}
            </Text>

            <Image
              source={storeImages[hit.store]}
              style={{
                width: 40,
                height: 13,
                resizeMode: 'contain',
              }}
            />
          </View>

          <View style={{ height: '80%' }}>
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
              {hit.productTitle}
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Text style={{ fontSize: 18, color: '#00BF15', fontWeight: '600', marginLeft: 5 }}>
                {hit.dealPercent}% Off
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingLeft: 5 }}>
              <Text style={{ fontSize: 22, color: 'black' }}>
                ₹{Math.round(hit.dealPrice)}
              </Text>
              <Text style={{ textDecorationLine: 'line-through', color: 'gray', marginLeft: 12, fontSize: 18 }}>
                ₹{hit.mrp}
              </Text>
            </View>
          </View>

        </View>
      </View>
    </TouchableOpacity>
  );
}

export default Hit;
