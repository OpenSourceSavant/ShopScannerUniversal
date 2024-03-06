import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Appbar, Snackbar,Checkbox,useTheme ,TouchableRipple  } from 'react-native-paper';
import { useNavigation } from 'expo-router';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const dummyData = {
  'Price Range': null,
  Discount: ['90% and above', '80% and above', '70% and above'],
  // Add more options as needed
};


/////////////////////////////////////////////////////// Placeholder component for PriceRangeFilter
const PriceRangeFilter = ({ sliderValues, onSliderChange }) => {

  const handleSliderChange = (values) => {
    onSliderChange(values);
  };

  const handleApply = () => {
    // Your logic when the "Apply" button is pressed
    // This function will be executed only when sliderValuesChanged is true
    setSliderValuesChanged(false); // Reset the state after applying changes
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selected Price Range</Text>
      <Text style={styles.priceRange}>{`₹${sliderValues[0]} - ₹${sliderValues[1]}`}</Text>
      <MultiSlider
          values={sliderValues}
          min={0}
          max={100000}
          step={1}
          sliderLength={200}
          selectedStyle={{ backgroundColor: '#FF4081' }}
          unselectedStyle={{ backgroundColor: '#D3D3D3' }}
          markerStyle={{ backgroundColor: '#FF4081' }}
          onValuesChange={(values) => handleSliderChange(values)}
        />
    </View>
  );
};
  
/////////////////////////////////////////////////////// Placeholder component for DiscountFilter
const DiscountFilter = ({ selectedFilterOption, selectedOptions, onCheckboxSelect }) => {
  const theme = useTheme();

  // Implement your DiscountFilter UI and logic here
  return (
    <View style={styles.container}>
      {dummyData[selectedFilterOption] &&
        dummyData[selectedFilterOption].map((option) => (
          <View key={option} style={{ marginBottom: 10 }}>
            <Checkbox.Item
              label={option}
              status={selectedOptions.includes(option) ? 'checked' : 'unchecked'}
              onPress={() => onCheckboxSelect(option)}
              labelStyle={{
                // Customize label styles if needed
              }}
              style={{
                backgroundColor: selectedOptions.includes(option) ? 'white' : 'transparent',
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderRadius: 5,
              }}
            />
          </View>
        ))}
    </View>
  );
};



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const FilterScreen = ({ onClose,onApply,selectedDiscountValue  }) => {
  const navigation = useNavigation();

  const [selectedFilterOption, setSelectedFilterOption] = useState('Price Range');
  const [selectedSubFilterOption, setSelectedSubFilterOption] = useState(null);
  const [sliderValues, setSliderValues] = useState([0, 100000]);
  const [sliderValuesChanged, setSliderValuesChanged] = useState(false);
  const [selectedDiscountOptions, setSelectedDiscountOptions] = useState([]);
  const [discountFilterChanged, setDiscountFilterChanged] = useState(false);

  useEffect(() => {
    // Initialize selectedFilters with the provided selectedOptions
    setSelectedOptions(selectedDiscountOptions || []);
  }, [selectedDiscountOptions]);

  const handleSliderChange = (values) => {
    setSliderValues(values);
    setSliderValuesChanged(true);
  };

  const handleCheckboxSelect = (option) => {
    setDiscountFilterChanged(true);
    console.log('DiscountFilterChanged');
    setSelectedOptions((prevSelectedOptions) => {
      const updatedOptions = prevSelectedOptions.includes(option)
        ? prevSelectedOptions.filter((selectedOption) => selectedOption !== option)
        : [...prevSelectedOptions, option];
  
      console.log(updatedOptions); // Log the updated options
  
      return updatedOptions;
    });
  
    setSelectedSubFilterOption(null);
  };
  
  

  
  // Dummy data for options with sub-options
  const dummyData = {
    'Price Range': null,
    Discount: ['10% and above', '20% and above', '30% and above'],
    // Add more options as needed
  };

  const handleFirstOptionSelect = (filter) => {
    setSelectedFilterOption(filter);
  };

  const handleOptionSelect = (option) => {
    // Check if the option is already selected
    if (selectedOptions.includes(option)) {
      // If selected, remove it from the selected options
      setSelectedOptions(selectedOptions.filter((selectedOption) => selectedOption !== option));
    } else {
      // If not selected, add it to the selected options
      setSelectedOptions([...selectedOptions, option]);
    }
  
    // Reset selected sub-option when changing the option
    setSelectedSubFilterOption(null);
  };
  

  const handleSubOptionSelect = (subOption) => {
    setSelectedFilterOption(subOption);
  };

  const handleClearAll = () => {
    // Logic to clear all selections
    setSliderValues([0, 100000]);
    setSliderValuesChanged(false);
    setSelectedSubFilterOption(null);
    setSelectedOptions([]);
  
    // Set discountFilterChanged to true if selectedOptions is not empty
    if (selectedOptions.length > 0) {
      setDiscountFilterChanged(true);
    }
  };
  

  const handleApply = () => {
    // Logic to apply the selected filters
    // You can implement the logic for this based on your requirements
    let calculatedDiscountValue = null;

    // Check if 'Discount' filter is selected and has options
    if (selectedFilterOption === 'Discount' && selectedOptions.length > 0) {
      // Assuming that the options are in the format 'X% and above'
      // Extract the discount values from the selected options
      const selectedDiscountValues = selectedOptions.map((option) => {
        const regexResult = /(\d+)% and above/.exec(option);
        return regexResult && regexResult.length >= 2 ? parseInt(regexResult[1], 10) : null;
      });

      // Find the maximum discount value
      calculatedDiscountValue = Math.max(...selectedDiscountValues.filter((value) => value !== null));
    }

    // Call the onApply callback with the selected filters
    onApply({
      selectedFilterOption,
      selectedSubFilterOption,
      sliderValues,
      selectedDiscountValue: calculatedDiscountValue, // Kept the prop name
    });

    onClose(); // Close the filter screen
  };

  const handleOnClosePress = () => {
    onClose(); // Call the onClose callback passed from DealsList
  };

  const renderRightSideContent = () => {
    // Render the appropriate component based on the selected filter option
    switch (selectedFilterOption) {
      case 'Price Range':
        return <PriceRangeFilter sliderValues={sliderValues} onSliderChange={handleSliderChange} />;
  
      case 'Discount':
        return (
          <DiscountFilter
            selectedFilterOption={selectedFilterOption}
            selectedOptions={selectedOptions}
            onCheckboxSelect={(option) => handleCheckboxSelect(option)}
          />
        );
  
      // Add more cases for other filter options
      default:
        return null;
    }
  };

  
  

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: '#fff', elevation: 3, height: 70, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14 }}>FILTERS</Text>
        </View>

        <TouchableRipple onPress={handleClearAll} rippleColor="rgba(0, 0, 0, .32)">
          <View style={{ marginRight: 16 }}>
            <Text style={{ color: '#FF4081', fontSize: 14 }}>Clear All</Text>
          </View>
        </TouchableRipple>
      </View>

        
        {/* Filter Section */}
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {/* First Column */}
          <View style={{ flex: 1 / 3, backgroundColor: '#F2F2F2', padding: 15,height:300  }}>
            {/* Render your filter options here */}
            {Object.keys(dummyData).map((filter) => (
              <TouchableOpacity
                key={filter}
                onPress={() => handleFirstOptionSelect(filter)}
                style={{
                  backgroundColor: selectedFilterOption === filter ? '#FF4081' : 'transparent',
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  borderRadius: 5,
                  marginBottom: 10,
                }}
              >
                <Text style={{ color: selectedFilterOption === filter ? 'white' : '#555555' }}>{filter}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {renderRightSideContent()}

        </View>

        {/* Apply and Close Buttons */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
        <TouchableRipple
            style={{
              flex: 1,
              backgroundColor: (sliderValuesChanged ||discountFilterChanged) ? '#FF4081' : '#CCCCCC',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 15,
              borderRadius: 5,
              margin: 5
            }}
            onPress={(sliderValuesChanged || discountFilterChanged) ? handleApply : null}
            disabled={!(sliderValuesChanged || discountFilterChanged)}
            >
        <View>
          <Text style={{ color: 'white' }}>Apply</Text>
        </View>
      </TouchableRipple>



          <TouchableRipple
            style={{
              flex: 1,
              borderColor: '#FF4081', // Customize the color as needed
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 15,
              borderRadius: 5,
              margin:5
            }}
            onPress={handleOnClosePress}
          >
            <View>
              <Text style={{ color: '#FF4081' }}>Close</Text>
            </View>
          </TouchableRipple>
        
     
        
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20 ,
    flex:2/3,
    height:'100%',
    marginRight:10,
    overflow:'hidden',
    
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 8,
  },
  priceRange: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 1,
  },
});

export default FilterScreen;
