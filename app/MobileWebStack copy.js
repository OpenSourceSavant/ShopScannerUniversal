import React from 'react';
import { View, Text,Image } from 'react-native';
import HomeScreen from './Screens/HomeScreen';
import DealsList from './Screens/DealsList';
import { Appbar } from 'react-native-paper';
import AllCategories from './Screens/AllCategories';

const MobileWebStack = () => {

  return (
       <View style={{flex:1}}> 

<Appbar.Header style={{ backgroundColor:'#fff' }}>
<Appbar.BackAction onPress={() => {}} />


    <Appbar.Content title="Shop Scanner" color='#000' style={{
      fontSize: 16,
      verticalAlign: 'top',
      position: 'relative',
      fontWeight: '700',
      fontFamily: 'Assistant',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      lineHeight: 'normal',
      textTransform: 'capitalize',
    }}
  />  
    <Appbar.Action icon={() => <Image source={require('..//assets/user.png')} style={{ width: 20, height: 20 }} />}  />
    <Appbar.Action icon={() => <Image source={require('..//assets/settings.png')} style={{ width: 20, height: 20 }} />}  />

  </Appbar.Header>

        <HomeScreen/>
        
        



       </View>
  );
};

export default MobileWebStack;
