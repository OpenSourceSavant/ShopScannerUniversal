import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const discountOptions = ['90% and above', '80% and above', '70% and above'];


const FilterScreen = ({ onClose, onApply, propSelectedDiscountOptions }) => {
  const [selectedDiscountOptions, setSelectedDiscountOptions] = useState([]);
  const [discountFilterChanged, setDiscountFilterChanged] = useState(false);

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

  return (
    <View style={{ flex: 1 }}>
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

      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1 / 3, backgroundColor: '#F2F2F2', padding: 15, height: '100%' }}>
          {/* Use your own logic for rendering filter options */}
          <TouchableOpacity style={{  backgroundColor: '#FF4081',
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderRadius: 5,
          marginBottom: 10,}}>
          <Text style={{ color: '#fff' }}>Discount Filter</Text>
          </TouchableOpacity>
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
    flex: 2 / 3,
    height: '100%',
    marginRight: 10,
    overflow: 'hidden',
  },
});

export default FilterScreen;
