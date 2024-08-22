// DealListSortFilterBar.js
import React from "react";
import { View, Text, Modal, TouchableWithoutFeedback } from "react-native";
import FastImage from "react-native-fast-image";
import { RadioButton, Button } from "react-native-paper";

const DealListSortFilterBar = ({
  showBottomSheet,
  setIsFilterScreenVisible,
  bottomSheetVisible,
  hideBottomSheet,
  handleSortOptionPress,
  selectedSortOption,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 60,
        elevation: 0,
        borderTopWidth: 0.9,
        borderTopColor: "#dfdfdf",
        backgroundColor: "#fff",
      }}
    >
      {/* Sort Button */}
      <TouchableWithoutFeedback
        onPress={showBottomSheet}
        style={{ height: 60 }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FastImage
            source={require("../../assets/user.png")}
            style={{ width: 18, height: 18 }}
          />
          <Text
            style={{ fontWeight: "400", marginLeft: 5, color: "#0f0f0f" }}
          >
            Sort
          </Text>
        </View>
      </TouchableWithoutFeedback>

      {/* Divider */}
      <View style={{ height: 50, width: 1.2, backgroundColor: "#d3d3d3" }} />

      {/* Filter Button */}
      <TouchableWithoutFeedback
        onPress={() => setIsFilterScreenVisible(true)}
        style={{ height: 60 }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FastImage
            source={require("../../assets/filter.png")}
            style={{ width: 18, height: 18 }}
          />
          <Text
            style={{ fontWeight: "400", marginLeft: 5, color: "#0f0f0f" }}
          >
            Filter
          </Text>
        </View>
      </TouchableWithoutFeedback>

      <Modal
        transparent={true}
        animationType="slide"
        visible={bottomSheetVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.bottomSheet}>
            {/* Close Button */}
            <View style={{ flexDirection: "row" }}>
              {/* Sort Options */}
              <Text style={styles.title}>Sort Options</Text>

              <Button
                onPress={hideBottomSheet}
                style={{ flex: 1, fontSize: 21 }}
                compact={true}
              >
                Close
              </Button>
            </View>
            <View>
              <RadioButton.Group
                onValueChange={(value) => handleSortOptionPress(value)}
                value={selectedSortOption}
              >
                <View style={styles.radioButtonContainer}>
                  <RadioButton.Item
                    label="Sort by Price (High to Low)"
                    value="dealPrice"
                  />
                  <RadioButton.Item
                    label="Sort by Discount (High to Low)"
                    value="discountPercentage"
                  />
                  {/* Add more sorting options as needed */}
                </View>
              </RadioButton.Group>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles (assuming you have them in your original file)
const styles = {
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  radioButtonContainer: {
    marginTop: 20,
  },
};

export default DealListSortFilterBar;
