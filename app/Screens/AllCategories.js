import React, { useState,useEffect  } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { router } from 'expo-router';
import { Appbar } from 'react-native-paper';

const screenWidth = Dimensions.get('window').width;

const AllCategories = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const subcategoryItemWidth = (screenWidth *0.9 ) / 3 - 20; // Adjust 20 for margins or padding

  const categories = [
    { 
      id: '1', 
      name: 'Gadgets', 
      image: require('..//..//assets/gadgets.png'), // Replace 'gadgets.png' with your actual image file
      subcategories: [
        { id: '101', name: 'Mobiles', image: require('..//..//assets/gadgets.png'), tags: ['electronics', 'gadgets'] },
        { id: '102', name: 'Laptops', image: require('..//..//assets/gadgets.png'), tags: ['electronics', 'gadgets'] },
        { id: '103', name: 'Cameras', image: require('..//..//assets/gadgets.png'), tags: ['electronics', 'gadgets'] },
        { id: '104', name: 'Earphones', image: require('..//..//assets/gadgets.png'), tags: ['electronics', 'gadgets'] },
        { id: '105', name: 'Televisions', image: require('..//..//assets/gadgets.png'), tags: ['electronics', 'gadgets'] },
        { id: '106', name: 'Air Conditioners', image: require('..//..//assets/gadgets.png'), tags: ['electronics', 'gadgets'] },
        { id: '107', name: 'Others', image: require('..//..//assets/gadgets.png'), tags: ['electronics', 'gadgets'] }
      ],
    },
    { 
      id: '2', 
      name: 'Footwear', 
      image: require('..//..//assets/menfootwear.png'), // Replace 'gadgets.png' with your actual image file
      subcategories: [
        { id: '201', name: 'Men\'s Shoes', image: require('..//..//assets/gadgets.png'), tags: ['electronics', 'gadgets'] },
        { id: '202', name: 'Women\'s Shoes', image: require('..//..//assets/gadgets.png'), tags: ['electronics', 'gadgets'] },
        { id: '203', name: 'Children\'s Shoes', image: require('..//..//assets/gadgets.png'), tags: ['electronics', 'gadgets'] },
        { id: '204', name: 'Sports Shoes', image: require('..//..//assets/gadgets.png'), tags: ['electronics', 'gadgets'] },
      ],
    },
    { 
      id: '3', 
      name: 'Clothing', 
      image: require('..//..//assets/menfashion.png'), // Replace 'gadgets.png' with your actual image file
      subcategories: [
        { id: '301', name: 'Men\'s Apparel', image: require('..//..//assets/gadgets.png'), tags: ['electronics', 'gadgets'] },
        { id: '302', name: 'Women\'s Apparel', image: require('..//..//assets/gadgets.png'), tags: ['electronics', 'gadgets'] },
        { id: '303', name: 'Children\'s Apparel', image: require('..//..//assets/gadgets.png'), tags: ['electronics', 'gadgets'] },
        { id: '304', name: 'Outerwear', image: require('..//..//assets/gadgets.png'), tags: ['electronics', 'gadgets'] },
      ],
    },
    {
      id: '4', 
      name: 'Beauty', 
      image: require('..//..//assets/beauty.png'), // Replace 'gadgets.png' with your actual image file
      subcategories: [
        { id: '401', name: 'Face Makeup', image: require('..//..//assets/gadgets.png'), tags: ['electronics', 'gadgets'] },
        { id: '402', name: 'Eye Makeup', image: require('..//..//assets/gadgets.png'), tags: ['electronics', 'gadgets'] },
        { id: '403', name: 'Lip Products', image: require('..//..//assets/gadgets.png'), tags: ['electronics', 'gadgets'] },
        { id: '404', name: 'Makeup Tools', image: require('..//..//assets/gadgets.png'), tags: ['electronics', 'gadgets'] },
      ],
    },
    {
      id: '5', 
      name: 'Home', 
      image: require('..//..//assets/homedecor.png'), // Replace 'gadgets.png' with your actual image file
      subcategories: [
        { id: '501', name: 'Furniture', image: require('..//..//assets/gadgets.png'), tags: ['electronics', 'gadgets'] },
  { id: '502', name: 'Decor', image: require('..//..//assets/gadgets.png'), tags: ['electronics', 'gadgets'] },
  { id: '503', name: 'Bedding', image: require('..//..//assets/gadgets.png'), tags: ['electronics', 'gadgets'] },
  { id: '504', name: 'Kitchenware', image: require('..//..//assets/gadgets.png'), tags: ['electronics', 'gadgets'] },
      ],
    },
   

    // ... Continue adding other categories and subcategories as needed
  ];
  

  useEffect(() => {
    console.log('Selected category changed to:', selectedCategoryId);

    if (categories.length > 0) {
      setSelectedCategoryId(categories[0].id);
    }
  }, []);
  
  const getSubcategories = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category && category.subcategories ? category.subcategories : [];
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{ flex: 1, margin: 8, alignItems: 'center', justifyContent: 'center' }}
      onPress={() => setSelectedCategoryId(item.id)}
    >
      <Image
        source={item.image }
        style={{   height: 55,
          width: 55,
          borderRadius: 30, // Half of the width and height to make it circular
          overflow: 'hidden', }}
      />
      <Text style ={{fontSize:12}}>{item.name}</Text>
    </TouchableOpacity>
  );

  const handleBackPress = () => {
    // Handle your back press logic here
    console.log('Back button pressed!');
    router.replace('MobileWebStack');

    
  };

  return (
    <View style={{flex:1}}>
      
     
    
    <View style={{ flexDirection: 'row', flex: 1 }}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={1}
          style={{backgroundColor:'#dfdfdf'}}
        />

      </View>
      <View style={{ flex: 3 }}>
        <FlatList
          data={getSubcategories(selectedCategoryId)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
            style={{ padding: 10, width: subcategoryItemWidth, alignItems: 'center' }}
            onPress={() =>   router.push('Screens/DealsList', { tags: item.tags })}
          >
            <Image
              source={item.image }
              style={{ height: 64,
                width: 64,
                borderRadius: 36, // Half of the width and height to make it circular
                overflow: 'hidden', }}
            />
            <Text style={{ textAlign: 'center',fontSize:13,fontWeight:"400",marginTop:5 }}>{item.name}</Text>
          </TouchableOpacity>
          
          )}
          numColumns={3}
        />
      </View>
    </View>
    </View>
  );
};

export default AllCategories;
