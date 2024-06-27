import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {db} from '../../firebaseConfig'; // Adjust the import according to your Firebase configuration file
import { useLocalSearchParams,router } from "expo-router";
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileDetails = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');

  const phoneNumber = useLocalSearchParams().phoneNumber;
  const deviceId = useLocalSearchParams().deviceId;

  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
  };

  const handleSave = async () => {
    if (name && name !== '' && email && email !== '' && gender && gender !== '') {
      try {
        // Create a query to find the document with the matching deviceId and phoneNumber
        const userQuery = query(
          collection(db, 'users'),
          where('deviceId', '==', deviceId),
          where('phoneNumber', '==', phoneNumber)
        );

        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userDocRef = userDoc.ref;

          // Update the document with the new details
          await updateDoc(userDocRef, {
            name: name,
            email: email,
            gender: gender,
          });
          await AsyncStorage.setItem('name', name);
          await AsyncStorage.setItem('email', email);
          await AsyncStorage.setItem('gender', gender);
          console.log('Profile details updated for user:', userDoc.id);
          // Navigate to another screen or show a success message
          router.replace('MobileStack'); // Adjust the route as needed
        } else {
          console.log('No user found with this device ID and phone number.');
        }
      } catch (error) {
        console.error('Error updating profile details:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Information</Text>
      <Text style={styles.subtitle}>
        Help us personalize your experience by providing some basic information. We use this data to send you the best deals tailored just for you.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="*Name"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="*Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Text style={styles.genderTitle}>Gender</Text>
      <View style={styles.genderContainer}>
        <TouchableOpacity style={styles.checkboxContainer} onPress={() => handleGenderChange('male')}>
          <CheckBox
            value={gender === 'male'}
            onValueChange={() => handleGenderChange('male')}
            tintColors={{ true: '#e91e63', false: '#aaa' }}
          />
          <Text style={styles.checkboxLabel}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkboxContainer} onPress={() => handleGenderChange('female')}>
          <CheckBox
            value={gender === 'female'}
            onValueChange={() => handleGenderChange('female')}
            tintColors={{ true: '#e91e63', false: '#aaa' }}
          />
          <Text style={styles.checkboxLabel}>Female</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#e91e63',
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
    color: '#555',
  },
  input: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#e91e63',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  genderTitle: {
    fontSize: 18,
    color: '#e91e63',
    marginVertical: 10,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#e91e63',
    padding: 15,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileDetails;
