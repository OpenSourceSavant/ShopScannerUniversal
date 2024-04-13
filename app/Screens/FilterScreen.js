import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,FlatList,Image } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const discountOptions = ['90% and above', '80% and above', '70% and above'];
const PriceFilterOptions=['0-499','500-999','1000-1999','2000-3999','4000 & Above']

const leftItems = [
  {'name':'Price','id':0},{'name':'Discount','id':1}]

const FilterScreen = ({ onClose, onApply, propSelectedDiscountOptions }) => {
  const [selectedDiscountOptions, setSelectedDiscountOptions] = useState([]);
  const [discountFilterChanged, setDiscountFilterChanged] = useState(false);
  const [selectedleftItemID, setSelectedleftItemID] = useState(0);

  useEffect(() => {
    setSelectedDiscountOptions(propSelectedDiscountOptions || []);

    console.log(selectedDiscountOptions)
  }, [propSelectedDiscountOptions]);

  const handleCheckboxSelect = (option) => {
    setDiscountFilterChanged(true);
    console.log('DiscountFilterChanged');
    setSelectedDiscountOptions((prevSelectedOptions) => {
      const updatedOptions = prevSelectedOptions.includes(option)
        ? prevSelectedOptions.filter((selectedOption) => selectedOption !== option)
        : [...prevSelectedOptions, option];

      console.log(updatedOptions); // Log the updated options

      return updatedOptions;
    });
  };

  const handleClearAll = () => {
    if (selectedDiscountOptions.length > 0) {
      setDiscountFilterChanged(true);
    }
    setSelectedDiscountOptions([]);

  };

  const handleApply = () => {  
    onApply(
      
      selectedDiscountOptions
    );

    onClose();
  };

  const handleOnClosePress = () => {
    onClose();
  };

  const renderLeftItem = ({ item }) => (
    <TouchableOpacity
      style={{ flex: 1, padding:9, alignItems: 'center', justifyContent: 'center',
      backgroundColor: selectedleftItemID === item.id ? '#f9f9f9' : 'transparent',
      borderLeftWidth: selectedleftItemID === item.id ? 5 : 0,
      borderLeftColor: selectedleftItemID === item.id ? '#D63C63' : 'transparent',
      
    }}
    >
     
      <Text style={{ fontSize: 12, textAlign: 'center',fontWeight:"500" }}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 ,paddingTop:20}}>
      <View style={{ backgroundColor: '#fff', elevation: 3, height: 70, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14 }}>FILTERS</Text>
        </View>

        <TouchableOpacity onPress={handleClearAll}>
          <View style={{ marginRight: 16 }}>
            <Text style={{ color: '#FF4081', fontSize: 14 }}>Clear All</Text>
          </View>
          
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', flex: 1,backgroundColor:'#f9f9f9' }}>
        <View style={{ flex: 2, backgroundColor: '#F2F2F2',height: '100%' }}>

        <FlatList
          data={leftItems}
          keyExtractor={(item) => item.id}
          renderItem={renderLeftItem}
          numColumns={1}
          style={{backgroundColor:'#E2E0E0'}}
        />

          
        
        </View>

        <View style={styles.container}>
          {discountOptions.map((option) => (
            <View key={option} style={{ marginBottom: 10 }}>
              <TouchableOpacity
                onPress={() => handleCheckboxSelect(option)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <CheckBox
                  value={selectedDiscountOptions.includes(option)}
                  onValueChange={() => handleCheckboxSelect(option)}
                  tintColors={{ true: '#FF4081', false: 'black' }} // Add this line

                />
                <Text style={{ marginLeft: 15,fontSize:19,marginBottom:10 }}>{option}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: discountFilterChanged ? '#FF4081' : '#CCCCCC',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 15,
            borderRadius: 5,
            margin: 5,
          }}
          onPress={discountFilterChanged ? handleApply : null}
          disabled={!discountFilterChanged}
        >
          <Text style={{ color: 'white' }}>Apply</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            borderColor: '#FF4081',
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 15,
            borderRadius: 5,
            margin: 5,
          }}
          onPress={handleOnClosePress}
        >
          <Text style={{ color: '#FF4081' }}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 5,
    height: '100%',
    marginRight: 10,
    overflow: 'hidden',
  },
});

export default FilterScreen;
