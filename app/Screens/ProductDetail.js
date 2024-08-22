import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Appbar } from "react-native-paper";
import FastImage from "react-native-fast-image";
import { LineChart } from "react-native-chart-kit";
import logo from "..//..//assets/icon.png";
import { useLocalSearchParams } from "expo-router";

import FlipkartLogo from "..//..//assets/flipkart_logo.png";
import AmazonLogo from "..//..//assets/amazon_logo.png";
import MyntraLogo from "..//..//assets/myntra_logo.png";
import NykaaLogo from "..//..//assets/nykaa_logo.png";
import AjioLogo from "..//..//assets/ajio_logo.png";
import ZivameLogo from "..//..//assets/zivame_logo.png";
import TiraLogo from "..//..//assets/tira_logo.png";

const storeImages = {
  flipkart: FlipkartLogo,
  amazon: AmazonLogo,
  myntra: MyntraLogo,
  nykaa: NykaaLogo,
  ajio: AjioLogo,
  zivame: ZivameLogo,
  tira: TiraLogo,
};

const ProductDetail = () => {
  const { productTitle, mrp, dealPrice, image_url, storeUrl,store } = useLocalSearchParams();

  
  const [priceData, setPriceData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });
  const [lowestPrice, setLowestPrice] = useState(0);
  const [highestPrice, setHighestPrice] = useState(0);
  const [averagePrice, setAveragePrice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {


    let apiUrl = "";

    //console.log("Store in use effect",store);

    switch (store) {
      case "amazon":
        apiUrl = "https://get-amazon-price-history-dynb6o5ava-uc.a.run.app";
        break;
      case "myntra":
        apiUrl = "https://get-myntra-price-history-dynb6o5ava-uc.a.run.app";
        break;
      case "nykaa":
        apiUrl = "https://get-nykaa-price-history-dynb6o5ava-uc.a.run.app";
        break;
      case "flipkart":
        apiUrl = "https://get-flipkart-price-history-dynb6o5ava-uc.a.run.app";
        break;
    }

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": "opin)Jm<_?*Z=I-Ugif;hf!(Q!Wk{AQa", // Use your actual API key
      },
      body: JSON.stringify({ product_url: storeUrl }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text(); // Use .text() to read the raw response
      })
      .then((rawData) => {
        //console.log("Raw response:", rawData); // Log the raw response
        try {
          const data = JSON.parse(rawData); // Attempt to parse JSON
          const prices = data.products || [];

          // Extract and format unique months from the data
          const labels = prices
            .map((item) =>
              new Date(item.time_ist).toLocaleString("default", {
                month: "short",
              })
            )
            .filter((month, index, self) => self.indexOf(month) === index); // Keep only unique months

          const priceValues = prices.map((item) => item.price);
          setLowestPrice(Math.floor(Math.min(...priceValues)));
          setHighestPrice(Math.floor(Math.max(...priceValues)));
          setAveragePrice(
            Math.floor(
              priceValues.reduce((acc, price) => acc + price, 0) /
                priceValues.length
            )
          );

          setPriceData({
            labels,
            datasets: [{ data: priceValues }],
          });
          
          setLoading(false);
        } catch (error) {
          console.error("Error parsing JSON:", error);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching price history:", error);
        setLoading(false);
      });
  }, [productTitle, mrp, dealPrice, image_url, storeUrl,store]);

  const screenWidth = Dimensions.get("window").width;

  

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header
        style={{ height: 40, marginTop: -15, backgroundColor: "#fff" }}
      >
        <Appbar.BackAction
          onPress={() => {
            /* Handle back action */
          }}
        />
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Image source={logo} style={{ width: 55, height: 55 }} />
        </View>
      </Appbar.Header>

      <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
        <FastImage
          source={{ uri: image_url }}
          style={styles.productImage}
          resizeMode={FastImage.resizeMode.contain}
        />

        <View style={styles.contentContainer}>
          <Text
            style={styles.productTitle}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {productTitle}
          </Text>

          <View style={styles.priceContainer}>
            <Text style={styles.mrp}>₹{mrp}</Text>
            <Text style={styles.dealPrice}>₹{dealPrice}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              margin: 16,
            }}
          >
            <FastImage
              source={storeImages[store]}
              style={styles.storeImage}
              resizeMode={FastImage.resizeMode.contain}
            />
            <View style={styles.viewOnAmazonContainer}>
              <Text style={styles.viewOnAmazonTextSmall}>View on</Text>
              <Text style={styles.viewOnAmazonTextLarge}>
                {store}
              </Text>
            </View>
          </View>

          {/* Conditional Rendering */}
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : (
            <>
              {/* Price History Graph */}
              <Text style={styles.pricingDetailValue}>Price History</Text>
              {priceData.datasets[0].data.length > 0 && (
                <View style={styles.chartContainer}>
                  <LineChart
                    data={priceData}
                    width={screenWidth - 32} // Adjusted for padding
                    height={250} // Adjust height as needed
                    yAxisLabel="₹"
                    yAxisSuffix=""
                    yAxisInterval={3} // Optional: Customize interval for better readability
                    chartConfig={{
                      backgroundColor: "#ffffff",
                      backgroundGradientFrom: "#ffffff",
                      backgroundGradientTo: "#ffffff",
                      decimalPlaces: 2, // Keep 2 decimal places for better price accuracy
                      color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                      style: {
                        borderRadius: 16,
                      },
                      propsForDots: {
                        r: "1",
                        strokeWidth: "1",
                        stroke: "#ffa726",
                      },
                      propsForBackgroundLines: {
                        strokeDasharray: "", // Removes dashed lines
                      },
                      fillShadowGradient: "#0000FF",
                      fillShadowGradientOpacity: 0.2, // Adjust fill gradient opacity
                    }}
                    bezier
                    fromZero // Start the Y-axis from zero
                    style={styles.chart}
                  />
                </View>
              )}

              {/* Pricing Details Section */}
              <View style={styles.pricingDetailsContainer}>
                <Text style={styles.pricingDetailsHeader}>Pricing details</Text>

                <View style={styles.pricingDetail}>
                  <Text style={styles.pricingDetailLabel}>Current price</Text>
                  <Text style={styles.pricingDetailValue}>
                    ₹{dealPrice}
                  </Text>
                </View>

                <View style={styles.pricingDetail}>
                  <Text style={styles.pricingDetailLabel}>
                    Lowest price ever
                  </Text>
                  <Text style={styles.pricingDetailValue}>₹{lowestPrice}</Text>
                </View>

                <View style={styles.pricingDetail}>
                  <Text style={styles.pricingDetailLabel}>Average price</Text>
                  <Text style={styles.pricingDetailValue}>₹{averagePrice}</Text>
                </View>

                <View style={styles.pricingDetail}>
                  <Text style={styles.pricingDetailLabel}>
                    Highest price ever
                  </Text>
                  <Text style={styles.pricingDetailValue}>₹{highestPrice}</Text>
                </View>
              </View>

              {/* Time to Buy Section */}
              <View style={styles.timeToBuyContainer}>
                <Text style={styles.timeToBuyHeader}>
                  Is this a good time to buy?
                </Text>

                <View style={styles.timeToBuyButtonsContainer}>
                  <Text
                    style={[
                      styles.timeToBuyButton,
                      { backgroundColor: "#00ff00" },
                    ]}
                  >
                    Yes
                  </Text>
                  <Text
                    style={[
                      styles.timeToBuyButton,
                      { backgroundColor: "#ff0000" },
                    ]}
                  >
                    No
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.viewOnAmazonButton}
        onPress={() => Linking.openURL(storeUrl)}
      >
        <Text style={styles.viewOnAmazonButtonText}>
          View on {store}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  productImage: {
    width: "100%",
    height: 300,
  },
  contentContainer: {
    padding: 16,
    backgroundColor: "#ffffff",
  },
  productTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  mrp: {
    fontSize: 16,
    color: "#888",
    textDecorationLine: "line-through",
    marginRight: 8,
  },
  dealPrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  storeImage: {
    width: 50,
    height: 50,
  },
  viewOnAmazonContainer: {
    alignItems: "flex-start",
  },
  viewOnAmazonTextSmall: {
    fontSize: 12,
    color: "#555",
  },
  viewOnAmazonTextLarge: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  chartContainer: {
    marginVertical: 16,
  },
  chart: {
    borderRadius: 16,
  },
  pricingDetailsContainer: {
    marginBottom: 16,
  },
  pricingDetailsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  pricingDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  pricingDetailLabel: {
    fontSize: 16,
    color: "#888",
  },
  pricingDetailValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  timeToBuyContainer: {
    marginBottom: 16,
  },
  timeToBuyHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  timeToBuyButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeToBuyButton: {
    padding: 8,
    borderRadius: 4,
    color: "#fff",
    textAlign: "center",
    flex: 1,
    margin: 4,
  },
  viewOnAmazonButton: {
    backgroundColor: "#ff9900",
    padding: 16,
    alignItems: "center",
  },
  viewOnAmazonButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default ProductDetail;
