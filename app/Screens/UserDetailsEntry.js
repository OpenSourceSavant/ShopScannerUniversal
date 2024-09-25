import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button, TextInput, Snackbar } from "react-native-paper";
import { db } from "../../firebaseConfig"; // Ensure this imports your Firebase config correctly
import { collection, addDoc } from "firebase/firestore"; // Import addDoc to create new documents
import { useNavigation, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserDetailsEntry = () => {
  const navigation = useNavigation();
  const { phoneNumber } = useLocalSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    // Enable the submit button only when all fields are filled
    if (name && email && gender) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [name, email, gender]);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async () => {
    setErrorMessage(""); // Reset error message

    if (!name) {
      setErrorMessage("Name cannot be empty.");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email.");
      return;
    }

    try {
      // Create a new user document in Firestore
      await addDoc(collection(db, "users"), {
        phoneNumber, // Include the phone number as part of the user details
        name,
        email,
        gender,
        loggedInTime: new Date().toISOString(), // Current time
      });

      await AsyncStorage.setItem("name", name);
      await AsyncStorage.setItem("email", email);
    await AsyncStorage.setItem("gender", gender);

      setSnackbarMessage("User details saved successfully!");
      setIsSnackbarVisible(true);

      // Navigate to MobileStack
      navigation.replace("MobileStack");
    } catch (error) {
      setSnackbarMessage(`Error: ${error.message}`);
      setIsSnackbarVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Welcome to ShopScanner! First time?
      </Text>
      <Text style={styles.infoText}>
        Please enter your details to know more about you.
      </Text>
      <Text style={styles.infoText}>
        We promise we will never share your information with anyone.
      </Text>

      <Text style={styles.headerText}>Enter Your Details</Text>

      <TextInput
        mode="outlined"
        label="Name"
        onChangeText={setName}
        value={name}
        style={styles.input}
      />

      <TextInput
        mode="outlined"
        label="Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        style={styles.input}
      />

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <Text style={styles.genderLabel}>Gender</Text>
      <View style={styles.genderContainer}>
        <TouchableOpacity
          onPress={() => setGender("Male")}
          style={styles.radioContainer}
        >
          <Text style={styles.radioLabel}>Male</Text>
          <View
            style={[
              styles.radioButton,
              gender === "Male" && styles.selectedRadio,
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setGender("Female")}
          style={styles.radioContainer}
        >
          <Text style={styles.radioLabel}>Female</Text>
          <View
            style={[
              styles.radioButton,
              gender === "Female" && styles.selectedRadio,
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setGender("Other")}
          style={styles.radioContainer}
        >
          <Text style={styles.radioLabel}>Other</Text>
          <View
            style={[
              styles.radioButton,
              gender === "Other" && styles.selectedRadio,
            ]}
          />
        </TouchableOpacity>
      </View>

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.submitButton}
        disabled={isButtonDisabled}
        color={isButtonDisabled ? "#ccc" : "#1E90FF"} // Gray when disabled
      >
        Submit
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
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#f4f6fc",
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  infoText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 15,
    color: "#555",
  },
  headerText: {
    fontSize: 26,
    marginBottom: 25,
    textAlign: "center",
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  genderLabel: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "600",
    color: "#555",
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 25,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#888",
    marginLeft: 8,
  },
  selectedRadio: {
    backgroundColor: "#1E90FF",
    borderColor: "#1E90FF",
  },
  radioLabel: {
    fontSize: 16,
    color: "#333",
  },
  submitButton: {
    marginTop: 30,
    paddingVertical: 12,
    borderRadius: 5,
  },
});

export default UserDetailsEntry;
