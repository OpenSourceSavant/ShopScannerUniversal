import React, { useState,useEffect  } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { router } from 'expo-router';
import { Appbar } from 'react-native-paper';
import logo from '..//..//assets/icon.png'; // Replace with the correct path
import FastImage from 'react-native-fast-image'

const screenWidth = Dimensions.get('window').width;

const AllCategories = ({route} ) => {
  console.log('Route object in All Categorie', route);

  // Check the structure of the route object and see if params is present
  const initialParams  = route.params ;
  let initialRouteSubCategory;

  if(initialParams){

  initialRouteSubCategory = initialParams.initialRouteSubCategory;

  console.log('initialRouteSubCategory in All Categories', initialRouteSubCategory);
  }

    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  
    const subcategoryItemWidth = (screenWidth *0.9 ) / 3 - 20; // Adjust 20 for margins or padding
  
  const categories   = [
    {
      id: '4', 
      name: 'Beauty & Personal Care', 
      image: require('..//..//assets/beauty.png'), // Replace 'gadgets.png' with your actual image file
      subcategories: [
        { id: '401', name: 'Facewash', image: require('..//..//assets/facewash.png'), tags: ['facewash'] },
        { id: '402', name: 'Sunscreen', image: require('..//..//assets/sunscreen.png'), tags: ['sunscreen'] },
        { id: '403', name: 'Face Serum', image: require('..//..//assets/faceserum.png'), tags: ['faceserum', 'serum'] },
        { id: '404', name: 'Moisturizer', image: require('..//..//assets/moituriser.png'), tags: ['moisturizer','moituriser'] },
        { id: '405', name: 'Hair Care', image: require('..//..//assets/haircare.png'), tags: ['hairwash', 'shampoo','hairserum'] },
        { id: '405', name: 'Makeup', image: require('..//..//assets/makeup.png'), tags: ['makeup'] },
        { id: '405', name: 'Perfumes', image: require('..//..//assets/perfumes.png'), tags: ['perfume', 'fragrance','deo'] },

      ],
    },
    { 
      id: '2', 
      name: 'Men\'s Fashion', 
      image: require('..//..//assets/menfashion.png'), // Replace 'gadgets.png' with your actual image file
      subcategories: [
        { id: '201', name: 'Shirts & T-Shirts', image: require('..//..//assets/shirts.png'), tags: ['menshirt','mentshirt','t-shirt','shirts&t-shirts'] },
        { id: '202', name: 'Jeans & Trousers', image: require('..//..//assets/jeans.png'), tags: ['menjeans', 'men\'sjeans','jeans&trousers'] },
        { id: '203', name: 'Ethinic Wear', image: require('..//..//assets/ethnicwear.png'), tags: ['menethnicwear'] },
        { id: '204', name: 'Winter Wear', image: require('..//..//assets/winterwear.png'), tags: ['menwinterwear'] },
        { id: '204', name: 'Watches', image: require('..//..//assets/menwatch.png'), tags: ['menwatch','smartwatch','watches'] },
        { id: '204', name: 'Backpacks', image: require('..//..//assets/menaccessories.png'), tags: ['menaccesories','backpack','bags'] },

      ],
    },
    { 
      id: '3', 
      name: 'Women\'s Fashion', 
      image: require('..//..//assets/womenfashion.png'), // Replace 'gadgets.png' with your actual image file
      subcategories: [
        { id: '301', name: 'Shirts & T-Shirts', image: require('..//..//assets/womenshirts.png'), tags: ['womenshirt','womentshirt','womenshirts'] },
        { id: '302', name: 'Jeans & Trousers', image: require('..//..//assets/womenjeans.png'), tags: ['womenjeans', 'womentrouser','jeans&trousers'] },
        { id: '303', name: 'Ethnic Wear', image: require('..//..//assets/womenethnicwear.png'), tags: ['womenethnicwear','saree','lehenga','women ethnic wear'] },
        { id: '304', name: 'Sarees', image: require('..//..//assets/womensaree.png'), tags: ['saree', 'sarees'] },
        { id: '304', name: 'Winter Wear', image: require('..//..//assets/womenwinterwear.png'), tags: ['womenwinterwear'] },
        { id: '304', name: 'Watches', image: require('..//..//assets/womenwatches.png'), tags: ['womenwatch', 'smartwatch'] },

      ],
    },
    { 
      id: '1', 
      name: 'Electronics & Gadgets', 
      image: require('..//..//assets/gadgets.png'), // Replace 'gadgets.png' with your actual image file
      subcategories: [
        { id: '101', name: 'Mobiles', image: require('..//..//assets/mobiles.png'), tags: ['mobile','mobiles','phone','smartphone'] },
        { id: '102', name: 'Laptops', image: require('..//..//assets/laptop.png'), tags: ['laptop','laptops'] },
        { id: '103', name: 'Cameras', image: require('..//..//assets/cameras.png'), tags: ['camera','cameras'] },
        { id: '104', name: 'Earphones', image: require('..//..//assets/earphones.png'), tags: ['earphones','headphones'] },
        { id: '105', name: 'Televisions', image: require('..//..//assets/tv.png'), tags: ['tv','television',',monitor','televisions'] },
        { id: '106', name: 'Air Conditioners', image: require('..//..//assets/ac.png'), tags: ['ac','air conditioner','air conditioners'] },
        { id: '107', name: 'Others', image: require('..//..//assets/electronisothers.png'), tags: ['electronics others'] },

      ],
    },
   
    {
      id: '7', 
      name: 'Footwear', 
      image: require('..//..//assets/casualshoes.png'), // Replace 'gadgets.png' with your actual image file
      subcategories: [
        { id: '701', name: 'Casual Shoes', image: require('..//..//assets/casualshoes.png'), tags: ['casualshoes','casual shoes'] },
        { id: '702', name: 'Sports Shoes', image: require('..//..//assets/sportshoes.png'), tags: ['sportsshoes','sports shoes'] },
        { id: '703', name: 'Formal Shoes', image: require('..//..//assets/formalshoes.png'), tags: ['formalshoes','formal shoes'] },
        { id: '704', name: 'Flip Flops', image: require('..//..//assets/flipflops.png'), tags: ['flipflops','flip flops'] },
        { id: '705', name: 'Heels', image: require('..//..//assets/heels.png'), tags: ['heels'] },
    

      ],
    },
    {
      id: '5', 
      name: 'Home Improvement', 
      image: require('..//..//assets/outdoor.png'), // Replace 'gadgets.png' with your actual image file
      subcategories: [
        { id: '501', name: 'Kitchen Ware', image: require('..//..//assets/kitchenware.png'), tags: ['kitchenware','kitchen ware'] },
        { id: '502', name: 'Home Decor', image: require('..//..//assets/homedecor.png'), tags: ['homedecor',' home decor'] },
        { id: '503', name: 'Furnishing', image: require('..//..//assets/furnishing.png'), tags: ['furnishing'] },
        { id: '504', name: 'Appliances', image: require('..//..//assets/appliances.png'), tags: ['appliances', 'ac','tv','refrigerator','fridge'] },
        { id: '504', name: 'Bathroom Accessories', image: require('..//..//assets/bathroom.png'), tags: ['bathroom',' ','taps'] },
        { id: '504', name: 'Outdoor and Garden', image: require('..//..//assets/outdoor.png'), tags: ['outdoor', 'garden','outdoor and garden'] },
        { id: '504', name: 'DIY Tools', image: require('..//..//assets/diytools.png'), tags: ['diytools','diy tools'] },


      ],
      
    },
    {
      id: '6', 
      name: 'Health & Wellness', 
      image: require('..//..//assets/oralcare.png'), // Replace 'gadgets.png' with your actual image file
      subcategories: [
        { id: '601', name: 'Oral Care', image: require('..//..//assets/oralcare.png'), tags: ['oralcare','oral care','toothbrush'] },
        { id: '602', name: 'Sexual Wellness', image: require('..//..//assets/sexualwellness.png'), tags: ['sexualwellness', 'condoms'] },
      
      ],
      
    },
   

    // ... Continue adding other categories and subcategories as needed
  ];
  

  useEffect(() => {
    console.log('Selected category changed to:', selectedCategoryId);

    if (categories.length > 0 && !initialRouteSubCategory) {
      setSelectedCategoryId(categories[0].id);
    }
    else{
      setSelectedCategoryId(initialRouteSubCategory)
    }
  }, []);
  
  const getSubcategories = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category && category.subcategories ? category.subcategories : [];
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{ flex: 1, padding:6, alignItems: 'center', justifyContent: 'center',
      backgroundColor: selectedCategoryId === item.id ? '#f9f9f9' : 'transparent',
      borderLeftWidth: selectedCategoryId === item.id ? 5 : 0,
      borderLeftColor: selectedCategoryId === item.id ? '#D63C63' : 'transparent',
      
    }}
      onPress={() => setSelectedCategoryId(item.id)}
    >
      <FastImage
        source={item.image}
        style={{
          height: 74,
          width: 74,
          borderRadius: 30,
          overflow: 'hidden',

        }}
      />
      <Text style={{ fontSize: 12, textAlign: 'center',fontWeight:"500" }}>{item.name}</Text>
    </TouchableOpacity>
  );

  const handleBackPress = () => {
    // Handle your back press logic here
    console.log('Back button pressed!');
    router.replace('MobileWebStack');

    
  };

  return (
    <View style={{flex:1}}>
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', elevation: 3, height: 70 }}>
        <FastImage source={logo} style={{ width: 64, height: 64, marginLeft: 5 }} />
      </View>
     
    
    <View style={{ flexDirection: 'row', flex: 1,backgroundColor:'#f9f9f9' }}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={1}
          style={{backgroundColor:'#E2E0E0'}}
        />

      </View>
        <View style={{ flex: 3 }}>
        
          <FlatList
            data={getSubcategories(selectedCategoryId)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ padding: 10, width: subcategoryItemWidth, alignItems: 'center' }}
                onPress={() => router.push({ pathname: 'Screens/DealsList', params: { tags: item.tags,lastRoute:'Categories',initialRouteSubCategory:selectedCategoryId } })}
              >
              <FastImage
                source={item.image}
                style={{
                  height: 84,
                  width: 84,
                  borderRadius: 36,
                  overflow: 'hidden',
                  
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
              
              <Text style={{ textAlign: 'center', fontSize: 13, fontWeight: "400", marginTop: 5 }}>{item.name}</Text>
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
