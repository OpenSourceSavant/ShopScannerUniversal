import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  BackHandler,
  Dimensions,
  TextInput,
} from "react-native";
import { Checkbox } from "react-native-paper";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

const discountOptions = [
  "50% and above",
  "60% and above",
  "70% and above",
  "80% and above",
  "90% and above",
];
const PriceFilterOptions = [
  "0-499",
  "500-999",
  "1000-1999",
  "2000-3999",
  "4000 & Above",
];

const leftItems = [
  { name: "Price", id: 2 },
  { name: "Discount", id: 1 },
  { name: "Stores", id: 3 },
  { name: "Category", id: 4 },
];

const stores = ["amazon", "flipkart", "myntra", "nykaa"];
const categories = [
  "facewash",
  "sunscreen",
  "faceserum",
  "moisturizer",
  "haircare",
  "makeup",
  "perfume",
  "menshirt",
  "menjeans",
  "menethnicwear",
  "menwinterwear",
  "menwatch",
  "menaccesories",
  "menbackpack",
  "womenshirt",
  "womenjeans",
  "womenethnicwear",
  "saree",
  "womenwinterwear",
  "womenwatch",
  "womenaccesories",
  "mobile",
  "laptop",
  "camera",
  "earphones",
  "tv",
  "ac",
  "electronics others",
  "casualshoes",
  "sportsshoes",
  "formalshoes",
  "flipflops",
  "heels",
  "kitchenware",
  "homedecor",
  "furnishing",
  "appliances",
  "bathroomaccessories",
  "outdoorandgarden",
  "diytools",
  "oralcare",
  "sexualwellness",
  "Exam Books",
];

const FilterScreen = ({
  onClose,
  onApply,
  propSelectedDiscountOptions,
  propSelectedPriceRange,
  tabbed,
  propSelectedStores,
  propSelectedCategories,
}) => {
  const [selectedDiscountOptions, setSelectedDiscountOptions] = useState([]);
  const [FilterChanged, setFilterChanged] = useState(false);
  const [selectedleftItemID, setSelectedleftItemID] = useState(2);
  const [priceRange, setPriceRange] = useState(propSelectedPriceRange);
  const [selectedStores, setSelectedStores] = useState(propSelectedStores);
  const [selectedCategories, setSelectedCategories] = useState(
    propSelectedCategories
  );
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [searchTerm, setSearchTerm] = useState("");

  const screenFlex = tabbed ? 0.87 : 0.95;

  useEffect(() => {
    setSelectedDiscountOptions(propSelectedDiscountOptions || []);
    console.log(selectedDiscountOptions);
  }, [propSelectedDiscountOptions]);

  useEffect(() => {
    const backAction = () => {
      console.log("Back button pressed");
      onClose();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const handleCheckboxSelect = (option) => {
    setFilterChanged(true);
    //console.log('DiscountFilterChanged');
    setSelectedDiscountOptions((prevSelectedOptions) => {
      const updatedOptions = prevSelectedOptions.includes(option)
        ? prevSelectedOptions.filter(
            (selectedOption) => selectedOption !== option
          )
        : [...prevSelectedOptions, option];

      //console.log(updatedOptions); // Log the updated options

      return updatedOptions;
    });
  };

  const handleClearAll = () => {
    if (selectedDiscountOptions.length > 0) {
      setFilterChanged(true);
    }
    setSelectedDiscountOptions([]);
    setSelectedStores([]);
    setPriceRange([0, 49999]);
  };

  const handleApply = () => {
    onApply(
      selectedDiscountOptions,
      priceRange,
      selectedStores,
      selectedCategories
    );
    onClose();
  };

  const handleOnClosePress = () => {
    onClose();
  };

  const handleLeftItemClick = (item) => {
    console.log("Selected item ID:", item.id);
    setSelectedleftItemID(item.id);
  };

  const handleSliderChange = (values) => {
    setPriceRange(values);
    setFilterChanged(true);
  };

  const toggleStoreSelection = (store) => {
    setFilterChanged(true);
    setSelectedStores((prevSelectedStores) =>
      prevSelectedStores.includes(store)
        ? prevSelectedStores.filter((s) => s !== store)
        : [...prevSelectedStores, store]
    );
  };

  const toggleCategorySelection = (category) => {
    setFilterChanged(true);
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter((s) => s !== category)
        : [...prevSelectedCategories, category]
    );
  };

  const renderLeftItem = ({ item }) => (
    <TouchableOpacity
      style={{
        flex: 1,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:
          selectedleftItemID === item.id ? "#f9f9f9" : "transparent",
        borderLeftWidth: selectedleftItemID === item.id ? 5 : 0,
        borderLeftColor:
          selectedleftItemID === item.id ? "#D63C63" : "transparent",
      }}
      onPress={() => handleLeftItemClick(item)}
    >
      <Text style={{ fontSize: 17, textAlign: "center", fontWeight: 400 }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderDiscountFilters = () => {
    return discountOptions.map((option) => (
      <View key={option} style={{ marginBottom: 10 }}>
        <TouchableOpacity
          onPress={() => handleCheckboxSelect(option)}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Checkbox
            status={
              selectedDiscountOptions.includes(option) ? "checked" : "unchecked"
            }
            onPress={() => handleCheckboxSelect(option)}
            color="#FF4081"
          />
          <Text
            style={{
              marginLeft: 15,
              fontSize: 17,
              marginBottom: 10,
              color: "#222",
            }}
          >
            {option}
          </Text>
        </TouchableOpacity>
      </View>
    ));
  };
  const renderPriceFilters = () => {
    return (
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 17, color: "#222" }}>
          Price Range:
          {priceRange[0]} - {priceRange[1]}
        </Text>
        <MultiSlider
          values={priceRange}
          sliderLength={Dimensions.get("window").width - 170}
          onValuesChange={handleSliderChange}
          min={0}
          max={4999}
          step={1}
          selectedStyle={{
            backgroundColor: "#FF4081",
          }}
          unselectedStyle={{
            backgroundColor: "silver",
          }}
          containerStyle={{
            height: 40,
          }}
          trackStyle={{
            height: 3,
          }}
          markerStyle={{
            height: 20,
            width: 20,
            backgroundColor: "#FF4081",
          }}
        />
      </View>
    );
  };
  const renderStoreFilters = () => {
    return (
      <View style={styles.checkboxContainer}>
        {stores.map((store, index) => {
          const capitalizedStore =
            store.charAt(0).toUpperCase() + store.slice(1);

          return (
            <TouchableOpacity
              key={index}
              style={styles.listItem}
              onPress={() => toggleStoreSelection(store)}
            >
              <Checkbox
                status={
                  selectedStores.includes(store) ? "checked" : "unchecked"
                }
                onPress={() => toggleStoreSelection(store)}
                color="#FF4081"
              />
              <Text style={styles.checkboxLabel}>{capitalizedStore}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
    if (text) {
      const filtered = categories.filter((category) =>
        category.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories);
    }
  };

  const renderCategoryItem = ({ item }) => {
    const capitalizedItem = item.charAt(0).toUpperCase() + item.slice(1);

    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => toggleCategorySelection(item)}
      >
        <Checkbox
          status={selectedCategories.includes(item) ? "checked" : "unchecked"}
          onPress={() => toggleCategorySelection(item)}
          color="#FF4081"
        />
        <Text style={styles.itemText}>{capitalizedItem}</Text>
      </TouchableOpacity>
    );
  };

  const renderCategoryFilters = () => {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.searchBox}
          placeholder="Search by Category"
          value={searchTerm}
          onChangeText={handleSearch}
        />
        <FlatList
          data={filteredCategories}
          renderItem={renderCategoryItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.list}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: screenFlex }}>
      <View
        style={{
          backgroundColor: "#fff",
          elevation: 3,
          height: 70,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 17, fontWeight: 400 }}>FILTERS</Text>
        </View>
        <TouchableOpacity onPress={handleClearAll}>
          <View style={{ marginRight: 16 }}>
            <Text style={{ color: "#FF4081", fontSize: 17, fontWeight: 400 }}>
              Clear All
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{ flexDirection: "row", flex: 1, backgroundColor: "#f9f9f9" }}
      >
        <View style={{ flex: 2, backgroundColor: "#F2F2F2", height: "100%" }}>
          <FlatList
            data={leftItems}
            keyExtractor={(item) => item.id.toString()} // Ensure the key is a string
            renderItem={renderLeftItem}
            numColumns={1}
            style={{ backgroundColor: "#E2E0E0" }}
          />
        </View>
        <View style={styles.container}>
          {selectedleftItemID === 1 && renderDiscountFilters()}
          {selectedleftItemID === 2 && renderPriceFilters()}
          {selectedleftItemID === 3 && renderStoreFilters()}
          {selectedleftItemID === 4 && renderCategoryFilters()}
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          marginBottom: 40,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: FilterChanged ? "#FF4081" : "#CCCCCC",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 15,
            borderRadius: 5,
            margin: 5,
          }}
          onPress={FilterChanged ? handleApply : null}
          disabled={!FilterChanged}
        >
          <Text style={{ color: "white" }}>Apply</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            borderColor: "#FF4081",
            borderWidth: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 15,
            borderRadius: 5,
            margin: 5,
          }}
          onPress={handleOnClosePress}
        >
          <Text style={{ color: "#FF4081" }}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 3.2,
    height: "100%",
    marginRight: 10,
    overflow: "hidden",
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 1,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
  },
  selectedChip: {
    backgroundColor: "#FF4081",
  },
  chipText: {
    fontSize: 16,
    color: "#000",
  },
  selectedChipText: {
    color: "#fff",
  },
  checkboxContainer: {
    marginTop: 10,
  },
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  checkboxLabel: {
    fontSize: 16,
    marginLeft: 10,
    color: "#000",
  },
  searchBox: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 5,
    marginBottom: 5,
  },

  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 0.8,
    borderBottomColor: "#ccc",
  },
  itemText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default FilterScreen;
