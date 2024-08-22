// DealCard.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image"; // Assuming you're using this library
import FlipkartLogo from "..//..//assets/flipkart_logo.png";
import AmazonLogo from "..//..//assets/amazon_logo.png";
import MyntraLogo from "..//..//assets/myntra_logo.png";
import NykaaLogo from "..//..//assets/nykaa_logo.png";
import AjioLogo from "..//..//assets/ajio_logo.png";
import ZivameLogo from "..//..//assets/zivame_logo.png";
import TiraLogo from "..//..//assets/tira_logo.png";
import { Link, router } from 'expo-router';

const storeImages = {
  flipkart: FlipkartLogo,
  amazon: AmazonLogo,
  myntra: MyntraLogo,
  nykaa: NykaaLogo,
  ajio: AjioLogo,
  zivame: ZivameLogo,
  tira: TiraLogo,
};

const timeAgo = (firestoreTimestamp) => {
  // Convert Firestore timestamp to JavaScript Date object
  const dealDate = new Date(firestoreTimestamp.seconds * 1000);

  const now = new Date();
  const differenceInSeconds = Math.round((now - dealDate) / 1000);
  const minutes = Math.round(differenceInSeconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (differenceInSeconds < 60) {
    return `${differenceInSeconds} second${
      differenceInSeconds === 1 ? "" : "s"
    } ago`;
  } else if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  } else {
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }
};

const handleDealClick = (deal) => {
  router.push({
    pathname: 'Screens/ProductDetail',
    params: {
      productTitle: deal.productTitle,
      mrp: deal.mrp,
      dealPrice: deal.dealPrice,
      image_url: deal.imageUrl,
      storeUrl: deal.storeUrl,
      store:deal.store
    },
  });
};


const DealItem = ({ deal }) => {
 
  return (
    <TouchableOpacity
      key={deal.dealId}
      onPress={() => handleDealClick(deal)}
      style={{
        width: "100%",
        height: 160,
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          height: "100%",
          borderTopWidth: 0.7, // Adjust the thickness as needed
          borderColor: "#d3d3d3", // Light grey color
        }}
      >
        {/* Content for the first div */}
        <View
          style={{
            width: "35%",
            flexDirection: "column",
            padding: 10,
          }}
        >
          <FastImage
            source={{ uri: deal.imageUrl }}
            style={{
              width: "100%",
              height: "100%",
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>

        {/* Content for the second div */}
        <View
          style={{
            width: "65%",
            backgroundColor: "#fff",
            padding: 3,
            paddingRight: 10,
            paddingLeft: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              height: "20%",
              paddingLeft: 5,
            }}
          >
            <Text
              style={{
                textAlign: "right",
                fontSize: 12,
                fontFamily: "sans-serif",
              }}
            >
              {timeAgo(deal.dealTime)}
            </Text>

            <FastImage
              source={storeImages[deal.store]}
              style={{
                width: 40,
                height: 13,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <View style={{ height: "80%" }}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{
                fontSize: 13,
                fontWeight: "400",
                marginBottom: 8,
                lineHeight: 16,
                overflow: "hidden",
                marginLeft: 5,
              }}
            >
              {deal.productTitle}
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#00BF15",
                  fontWeight: "500",
                  marginLeft: 5,
                }}
              >
                {deal.discountPercentage}% Off
              </Text>
            </View>

         

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
                paddingLeft: 5,
              }}
            >
              <Text style={{ fontSize: 22, color: "black" }}>
                ₹{Math.round(deal.dealPrice)}
              </Text>
              <Text
                style={{
                  textDecorationLine: "line-through",
                  color: "gray",
                  marginLeft: 12,
                  fontSize: 18,
                }}
              >
                ₹{deal.mrp}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DealItem;
