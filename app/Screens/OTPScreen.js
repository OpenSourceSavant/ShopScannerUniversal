import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button, TextInput, Snackbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { router, useNavigation, useLocalSearchParams } from "expo-router";

const OTPScreen = () => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState("");
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const phoneNumber = useLocalSearchParams().phoneNumber;
  const otpValue = useLocalSearchParams().otpValue;

  useEffect(() => {
    console.log(otpValue);
  }, []);
  
  const handleOtpSubmit = async () => {
    if (otp === otpValue) {
      try {
        await AsyncStorage.setItem("isLoggedIn", "true");
        const deviceId = await AsyncStorage.getItem("deviceId");
        const userQuery = query(
            collection(db, "users"),
            where("phoneNumber", "==", phoneNumber)
          );
          
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userDocRef = userDoc.ref;

          await updateDoc(userDocRef, {
            phoneNumber: phoneNumber,
            isLoggedIn: true,
          });

          setSnackbarMessage(`Login Successful`);
          setIsSnackbarVisible(true);

          const userData = userDoc.data();
          if (userData.name) {
            setSnackbarMessage(`Welcome back, ${userData.name}!`);
            await AsyncStorage.setItem("name", userData.name);
          }
          await AsyncStorage.setItem("email", userData.email);
          await AsyncStorage.setItem("gender", userData.gender);
          router.replace({ pathname: 'MobileStack' });

        } else {
          // User not found, navigate to UserDetailsEntry
          router.replace({ pathname: 'Screens/UserDetailsEntry', params: { phoneNumber: phoneNumber } });

        }
      } catch (error) {
        setSnackbarMessage(`Error: ${error}`);
        setIsSnackbarVisible(true);
      }
    } else {
      setSnackbarMessage("Invalid OTP");
      setIsSnackbarVisible(true);
    }
  };

  const handleClose = () => {
    router.replace('MobileStack');
  };

  return (
    <View style={styles.OtpScreenMainContainer}>
      <View style={{ flex: 0.2, width: "100%" }}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.infoText}>Verify with OTP</Text>
      <Text style={styles.smsSentText}>Sent via SMS to {phoneNumber}</Text>

      <TextInput
        mode="outlined"
        label="OTP"
        keyboardType="phone-pad"
        onChangeText={setOtp}
        value={otp}
        style={styles.otpTextInput}
        maxLength={6}
      />

      <Button
        mode="contained"
        onPress={handleOtpSubmit}
        disabled={otp.length !== 6}
        style={styles.submitOTPButton}
      >
        Submit OTP
      </Button>
      <Snackbar
          visible={isSnackbarVisible}
          onDismiss={() => setIsSnackbarVisible(false)}
          duration={2000}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  OtpScreenMainContainer: {
    flex: 1,
    padding: 20,
    marginTop: 30,
  },
  closeButton: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "600",
  },
  smsSentText: {
    marginBottom: 20,
    fontSize: 16,
  },
  otpTextInput: {
    marginBottom: 20,
  },
  submitOTPButton: {
    marginTop: 20,
  },
});

export default OTPScreen;
