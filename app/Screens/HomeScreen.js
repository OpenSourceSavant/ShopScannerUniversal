import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  RefreshControl,
  Platform,
  TouchableOpacity,
  TextInput,
  Text,
  Animated,
} from "react-native";
import { ActivityIndicator, Appbar } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRoute } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import logo from "..//..//assets/icon.png";
import notification from "..//..//assets/notification.png";
import search_icon from "..//..//assets/search_icon.png";
import * as StoreReview from "expo-store-review";
import ChooseByStore from "../Components/ChooseByStore";
import ValueStore from "../Components/ValueStore";
import PercentageCardsList from "../Components/PercentageCardsList";
import CategoriesSection from "../Components/CategoriesSection";
import PriceCards from "../Components/PriceCards";
import ArrivedJustNow from "../Components/ArrivedJustNow";
import TopHomeCarousel from "../Components/TopHomeCarousel";
import MadeWithLove from "../Components/MadeWithLove";
import ScrollableCards1 from "../Components/ScrollableCards1";
import BottomHomeCarousel from "../Components/BottomHomeCarousel";
import setupGoogleAnalytics from "../analytics";
import { useLocalSearchParams, router } from "expo-router";

const viewsData = [
  { type: "TopHomeCarousel" },
  { type: "CategoriesSection" },
  { type: "ArrivedJustNow" },
  { type: "ChooseByStore" },
  { type: "BottomHomeCarousel" },
  { type: "PercentageCardsList" },
  { type: "ValueStore" },
  { type: "PriceCards" },
  { type: "ScrollableCards1" },
  { type: "MadeWithLove" },
];



const placeholderTexts = [
  "Search for Products",
  "Search for Lipstick",
  "Search for Shoes",
  "Search for your favourite brand",
];

const HomeScreen = ({ route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [opacityAnimation] = useState(new Animated.Value(1));
  const [randomLoaderText, setRandomLoaderText] = useState("");
  const [lastClickedIndex, setLastClickedIndex] = useState(null);
  const [initialScrollIndex, setInitialScrollIndex] = useState(0);
  const flatListRef = useRef(null);
  const navigation = useNavigation();
  const { lastRoute } = route.params;

  useEffect(() => {
    if (lastRoute === "Splash") {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [lastRoute]);

  useEffect(() => {
    const initializeAnalytics = async () => {
      const analytics = await setupGoogleAnalytics();
      analytics.logEvent("home_screen_android");
    };
    initializeAnalytics();
  }, []);

  useEffect(() => {
    const animatePlaceholder = () => {
      Animated.sequence([
        Animated.timing(opacityAnimation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setCurrentPlaceholderIndex((prevIndex) =>
          prevIndex === placeholderTexts.length - 1 ? 0 : prevIndex + 1
        );
      });
    };
    const intervalId = setInterval(animatePlaceholder, 2000);
    return () => clearInterval(intervalId);
  }, [opacityAnimation]);

  useEffect(() => {
    if (flatListRef.current && initialScrollIndex !== null) {
      flatListRef.current.scrollToIndex({
        index: initialScrollIndex,
        animated: false,
      });
    }
  }, [initialScrollIndex]);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const navigateToSearchScreen = () => {
    router.push("Screens/SearchScreen");
  };

  const handleItemClick = (type) => {
    console.log("Handling item click for type:", type);
    switch (type) {
      case "TopHomeCarousel":
        console.log("TopHomeCarousel clicked");
        break;
      case "CategoriesSection":
        console.log("CategoriesSection clicked");
        break;
      case "ChooseByStore":
        console.log("ChooseByStore clicked");
        break;
      case "BottomHomeCarousel":
        console.log("BottomHomeCarousel clicked");
        break;
      case "PercentageCardsList":
        console.log("PercentageCardsList clicked");
        break;
      case "ValueStore":
        console.log("ValueStore clicked");
        break;
      case "PriceCards":
        console.log("PriceCards clicked");
        break;
      case "ScrollableCards1":
        console.log("ScrollableCards1 clicked");
        break;
      case "MadeWithLove":
        console.log("MadeWithLove clicked");
        break;
      default:
        break;
    }
  };

  const handleNotificationClick = () => {
    router.push("Screens/NotificationScreen");
  };

  const renderItem = ({ item }) => {
    const Component = {
      TopHomeCarousel: <TopHomeCarousel />,
      CategoriesSection: <CategoriesSection />,
      ChooseByStore: <ChooseByStore />,
      ArrivedJustNow: <ArrivedJustNow />,
      BottomHomeCarousel: <BottomHomeCarousel />,
      PercentageCardsList: <PercentageCardsList />,
      ValueStore: <ValueStore />,
      PriceCards: <PriceCards />,
      ScrollableCards1: <ScrollableCards1 />,
      MadeWithLove: <MadeWithLove />,
    }[item.type];

    return (
      <TouchableOpacity
        onPress={() => handleItemClick(item.type)}
        style={styles.touchable}
      >
        {Component}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator animating={true} color={"#d53b62"} />
          <Text
            style={{
              marginTop: 15,
              color: "#555555",
              fontSize: 16,
              paddingLeft: 30,
              paddingRight: 30,
              textAlign: "center",
            }}
          >
            {randomLoaderText}
          </Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor="#fff" />
          <Appbar.Header
            style={{ height: 40, marginTop: -15, backgroundColor: "#fff" }}
          >
            <Image
              source={logo}
              style={{ width: 55, height: 55, marginLeft: 10 }}
            />
            <View style={{ flex: 1 }}></View>
            <TouchableOpacity onPress={handleNotificationClick}>
              <Image
                source={notification}
                style={{ width: 28, height: 28, marginRight: 10 }}
              />
            </TouchableOpacity>
          </Appbar.Header>

          <View style={{ backgroundColor: "#fff" }}>
            <View style={styles.inputContainer}>
              <FastImage
                source={search_icon}
                style={{ width: 24, height: 24, marginLeft: 5 }}
              />

              <TextInput
                style={styles.input}
                placeholderTextColor="#222"
                onFocus={navigateToSearchScreen}
                placeholder={placeholderTexts[currentPlaceholderIndex]}
              />
            </View>
          </View>
          <FlatList
            data={viewsData}
            ref={flatListRef}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            refreshControl={
              Platform.OS !== "web" && (
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                />
              )
            }
            initialScrollIndex={initialScrollIndex}
            viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
            style={{ backgroundColor: "#fff" }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    margin: 10,
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 25,
    height: 50,
    padding: 5,
    backgroundColor: "#fff",
  },
  input: {
    height: 30,
    flex: 1,
    color: "#d3d3d3",
    marginLeft: 15,
  },
  touchable: {
    marginBottom: 10,
  },
});

export default HomeScreen;
