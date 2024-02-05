import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Link, useNavigation } from 'expo-router';

const ValueStore = () => {
  const navigation = useNavigation();

  const handleLinkPress = (type, value) => {
    navigation.navigate('DealsList', { type, value });
  };

  return (
    <View style={styles.container}>
      <Image
          source={require('..//..//assets/banners-13.png')}
          style={styles.topimage}/>

      
      
      <View style={styles.gridContainer}>
        <TouchableOpacity onPress={() => handleLinkPress('valuestore', 'MakeUp')} style={styles.gridItem}>
          <Image
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/smartsaver-ace3e.appspot.com/o/ValueStore1.png?alt=media&token=568f28e8-3d8b-44f1-bee7-4e403094c42e' }}
            style={styles.image}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleLinkPress('valuestore', 'SkinCare')} style={[styles.gridItem, { marginTop: 20 }]}>
          <Image
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/smartsaver-ace3e.appspot.com/o/ValueStore2.png?alt=media&token=c86ce4e8-1d35-4b52-832b-1ea06dc59221' }}
            style={styles.image}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleLinkPress('valuestore', 'HairCare')} style={styles.gridItem}>
          <Image
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/smartsaver-ace3e.appspot.com/o/ValueStore3.png?alt=media&token=08185695-1a88-4665-9183-fae78973a425' }}
            style={styles.image}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleLinkPress('valuestore', 'Fragrances')} style={[styles.gridItem, { marginTop: 20 }]}>
          <Image
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/smartsaver-ace3e.appspot.com/o/ValueStore4.png?alt=media&token=aa76cfb2-88fa-4531-bfa8-b8c917003157' }}
            style={styles.image}
          />
        </TouchableOpacity>

        {/* Add more links for other items */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5C5DB',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '50%', // Adjust width as needed based on your design
    marginBottom: 10,
  },
  image: {
    width: '100%', // Adjust width as needed based on your design
    height: 230,
    resizeMode:'contain'
    
  },
  topimage:{
    width:'100%',
    height:150,
    resizeMode:'cover'
  }
});

export default ValueStore;
