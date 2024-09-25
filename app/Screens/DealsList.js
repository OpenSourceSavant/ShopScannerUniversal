import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  View,

  StyleSheet,
  Dimensions,
  Platform,
  RefreshControl,
  BackHandler,
} from "react-native";
import { db } from "../../firebaseConfig"; // Adjust the import according to your Firebase configuration file

import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  where,
} from "firebase/firestore";
import {
  ActivityIndicator,

  Snackbar,
} from "react-native-paper";
import { Linking } from "react-native";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import FilterScreen from "./FilterScreen";
import backIcon from "..//..//assets/left-arrow.png"; // Replace with the correct path
import logo from "..//..//assets/icon.png"; // Replace with the correct path
import DealItem from "../Components/DealItem";
import FastImage from "react-native-fast-image";
import DealListSortFilterBar from "../Components/DealListSortFilterBar";
import { StatusBar } from "expo-status-bar";




const { height: screenHeight } = Dimensions.get("window");

const DealsList = ({ route }) => {
  const screenHeight = Dimensions.get("window").height;
  const [deals, setDeals] = useState([]);
  const [isMoreDataAvailable, setIsMoreDataAvailable] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState(null);
  const [sortOptionChanged, setSortOptionChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filterScreenVisible, setIsFilterScreenVisible] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [selectedDiscountOptions, setSelectedDiscountOptions] = useState([]);
  const [filterChanged, setfilterChanged] = useState(false);
  const [newPriceRange, setNewPriceRange] = useState([0, 49999]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedStores, setSelectedStores] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);



  const navigation = useNavigation();
  const windowHeight = Dimensions.get("window").height;

  const router = useRouter();

  const tabbed = route?.params?.tabbed;
  console.log(tabbed);

  const translateY = useSharedValue(windowHeight);

  const showBottomSheet = () => setBottomSheetVisible(true);
  const hideBottomSheet = () => {
    setBottomSheetVisible(false);
    console.log("Hide Bottom Sheet Pressed");
  };

  const tagsObject = useLocalSearchParams().tags;

  const lastRoute = useLocalSearchParams().lastRoute;

  const yRef = useLocalSearchParams().yRef;

  const initialRouteSubCategory =
    useLocalSearchParams().initialRouteSubCategory;
  const tags =
    typeof tagsObject === "string" && tagsObject !== null
      ? tagsObject.split(",")
      : [];

  console.log("Last Route in Deals List", lastRoute);

  console.log("lastRoute", lastRoute);

  useEffect(() => {
    const backAction = () => {
      console.log("Back button pressed");
      handleBackPress();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  useEffect(() => {
    if (filterScreenVisible) {
      if (tabbed) {
        translateY.value = withSpring(150, { damping: 15 });
      } else {
        translateY.value = withSpring(70, { damping: 15 });
      }
    } else {
      translateY.value = withSpring(screenHeight, { damping: 15 });
    }
  }, [filterScreenVisible]);

  const handleBackPress = () => {
    console.log("back pressed in deals list");

    if (filterScreenVisible) {
      setIsFilterScreenVisible(false);
    } else if (bottomSheetVisible == true) {
      setBottomSheetVisible(false);
    } else {
      const navigationParams = {
        pathname: "MobileStack",
        params: { 
          lastRoute: lastRoute,
          yRef:yRef
        },
      };

      if (lastRoute) {
        navigationParams.params = {
          lastRoute: lastRoute,
          initialRouteSubCategory: initialRouteSubCategory,
          yRef:yRef
        };
      }

      router.navigate(navigationParams);
    }
  };

  const fetchDeals = async () => {
    try {
      let dealsQuery;
      let filterConditions = [];
      const orderField = selectedSortOption || "dealTime";
  
      let hasDiscountFilter = selectedDiscountOptions.length > 0;
  
      // Apply discount filters
      if (hasDiscountFilter) {
        if (selectedDiscountOptions.includes("90% and above")) {
          filterConditions.push(where("discountPercentage", ">=", 90));
        } else if (selectedDiscountOptions.includes("80% and above")) {
          filterConditions.push(where("discountPercentage", ">=", 80));
        } else if (selectedDiscountOptions.includes("70% and above")) {
          filterConditions.push(where("discountPercentage", ">=", 70));
        } else if (selectedDiscountOptions.includes("60% and above")) {
          filterConditions.push(where("discountPercentage", ">=", 60));
        } else if (selectedDiscountOptions.includes("50% and above")) {
          filterConditions.push(where("discountPercentage", ">=", 50));
        }
  
        filterConditions.push(orderBy("discountPercentage", "desc"));
      }
  
      // Apply price range filter
      if (newPriceRange[0] > 0 || newPriceRange[1] < 49999) {
        filterConditions.push(
          where("dealPrice", ">=", newPriceRange[0]),
          where("dealPrice", "<=", newPriceRange[1])
        );
      }
  
      // Apply store filter
      if (selectedStores.length > 0) {
        filterConditions.push(where("store", "in", selectedStores));
      }

      if(selectedCategories.length>0){
        tags.push(...selectedCategories);
        console.log(tags)
      }
  
      if (lastVisible && isMoreDataAvailable) {
        dealsQuery = query(
          collection(db, "deals"),
          ...(tags && tags.length > 0
            ? [where("Tags", "array-contains-any", tags)]
            : []),
          ...filterConditions,
          orderBy(orderField, "desc"),
          startAfter(lastVisible),
          limit(10)
        );
      } else {
        dealsQuery = query(
          collection(db, "deals"),
          ...(tags && tags.length > 0
            ? [where("Tags", "array-contains-any", tags)]
            : []),
          ...filterConditions,
          orderBy(orderField, "desc"),
          limit(10)
        );
      }
  
      const querySnapshot = await getDocs(dealsQuery);
  
      if (!querySnapshot.empty && querySnapshot.docs.length > 0) {
        if (!lastVisible) {
          setDeals(
            querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        } else {
          setDeals((prevDeals) => {
            const newDeals = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
  
            const uniqueNewDeals = newDeals.filter((newDeal) => {
              return !prevDeals.some(
                (prevDeal) => prevDeal.dealId === newDeal.dealId
              );
            });
  
            return [...prevDeals, ...uniqueNewDeals];
          });
        }
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      } else {
        setIsMoreDataAvailable(false);
      }
    } catch (error) {
      console.error("Error fetching deals:", error);
    }
  };
  
  

  const handleScroll = ({
    nativeEvent: {
      contentOffset: { y },
      velocity,
      contentSize,
      layoutMeasurement,
    },
  }) => {
    const scrollThreshold = 250;
    const isBottom =
      y >= contentSize.height - layoutMeasurement.height - scrollThreshold;

    if (isBottom && isMoreDataAvailable && !isLoading) {
      console.log("############FETCHING DEALS ON SCROLL##############");
      fetchDeals();
    }
  };

  const handleCloseFilterScreen = () => {
    setIsFilterScreenVisible(false);
  };

  const handleFilterApply = (selectedDiscountOptions, priceRange,selectedStores,selectedCategories) => {
    console.log("Selected Discount Options:", selectedDiscountOptions); // Log selected discount value to console
    console.log(priceRange);
    lowerPrice = priceRange[0];
    upperPrice = priceRange[1];
    setNewPriceRange(priceRange);
    console.log("Lower price range", lowerPrice);
    console.log("Upper price range", upperPrice);
    setSelectedDiscountOptions(selectedDiscountOptions); // Update the state with the selected discount value
    setfilterChanged(true);
    setIsFilterScreenVisible(false); // Hide the filter screen
    setSelectedStores(selectedStores);
    setSelectedCategories(selectedCategories);
    console.log(selectedStores);
  };

  const handleSortOptionPress = async (option) => {
    //setSnackbarMessage(`sort ${option} selected`);
    //setIsSnackbarVisible(true);
    setSelectedSortOption(option);
    setSortOptionChanged(true); // Set sortOptionChanged to true when the sort option changes
    setLastVisible(null);
    console.log(lastVisible);
    console.log(selectedSortOption);
    hideBottomSheet();
  };

  const handleRefresh = () => {
    setRefreshing(true);
  };

  useEffect(() => {
    if (!initialFetchDone || sortOptionChanged || filterChanged || refreshing) {
      setLastVisible(null);
      console.log("isLoading", isLoading);

      if (lastVisible == null) {
        fetchDeals();
        setSortOptionChanged(false); // Reset sortOptionChanged after fetching deals
        setInitialFetchDone(true);
        setfilterChanged(false);
      }

      setIsLoading(false);
      setRefreshing(false);
    }
  }, [
    isMoreDataAvailable,
    selectedSortOption,
    sortOptionChanged,
    isLoading,
    lastVisible,
    filterChanged,
    selectedDiscountOptions,
    setDeals,
    setIsLoading,
    refreshing,
  ]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#fff" />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          elevation: 3,
          height: 70,
        }}
      >
        {tabbed === undefined && (
          <TouchableOpacity onPress={handleBackPress} style={{ padding: 10 }}>
            <FastImage
              source={backIcon}
              style={{ width: 24, height: 24, margin: 0 }}
            />
          </TouchableOpacity>
        )}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: "auto",
          }}
        >
          <TouchableOpacity>
            <FastImage
              source={logo}
              style={{ width: 64, height: 64, marginRight: 5 }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {!filterScreenVisible && (
        <View style={{ flex: 1, position: "relative" }}>
          <ScrollView
            style={{ flex: 1 }}
            onScroll={handleScroll}
            scrollEventThrottle={200}
            refreshControl={
              Platform.OS !== "web" && (
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                />
              )
            }
          >
            <View style={{ flex: 1 }}>
              {deals.length == 0 ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    height: windowHeight - 168,
                  }}
                >
                  <ActivityIndicator animating={true} color={"#d53b62"} />
                  <Text
                    style={{
                      color: "#555555",
                      fontSize: 16,
                      paddingLeft: 40,
                      paddingRight: 40,
                      textAlign: "center",
                      marginTop: 40,
                    }}
                  >
                    Discover savings, Shop Scanner awaits you!
                  </Text>
                </View>
              ) : (
                <View style={{ flex: 1 }}>
                  {deals.map((deal, index) => (
                    <DealItem key={index} deal={deal} />
                  ))}
                </View>
              )}
            </View>
          </ScrollView>

          {/* ######################################SORT AND FILTER BAR ###################################### */}
          <DealListSortFilterBar
              showBottomSheet={showBottomSheet}
              setIsFilterScreenVisible={() => {setIsFilterScreenVisible(true)}}
              bottomSheetVisible={bottomSheetVisible}
              hideBottomSheet={hideBottomSheet}
              handleSortOptionPress={handleSortOptionPress}
              selectedSortOption={selectedSortOption}
      />
        </View>
      )}

      {filterScreenVisible && (
        <View style={styles.overlay} onBackdropPress={() => handleBackPress()}>
          <Animated.View style={[styles.container, animatedStyle]}>
            <FilterScreen
              onClose={handleCloseFilterScreen}
              onApply={handleFilterApply}
              propSelectedDiscountOptions={selectedDiscountOptions}
              propSelectedPriceRange={newPriceRange}
              propSelectedStores = {selectedStores}
              propSelectedCategories = {selectedCategories}
              tabbed={tabbed}
            />
          </Animated.View>
        </View>
      )}

      {!isLoading && (
        <Snackbar
          visible={isSnackbarVisible}
          onDismiss={() => setIsSnackbarVisible(false)}
          duration={2000}
        >
          {snackbarMessage}
        </Snackbar>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  bottomSheet: {
    backgroundColor: "#fff",
    padding: 16,
    height: "50%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 20,
  },
  closeButtonText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 5,
    fontWeight: "bold",
    flex: 2,
  },
  radioButtonContainer: {
    marginTop: 10,
  },

  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: screenHeight,
    backgroundColor: "white",
  },
});

export default DealsList;
