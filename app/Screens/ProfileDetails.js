import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const ProfileDetails = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');

  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
  };

  const handleSave = () => {
    // Perform save action here
    console.log(`Name: ${name}, Email: ${email}, Gender: ${gender}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Information</Text>
      <Text style={styles.subtitle}>
        Help us personalize your experience by providing some basic information. We use this data to send you the best deals tailored just for you.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
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
        <TouchableOpacity style={styles.checkboxContainer} onPress={() => handleGenderChange('other')}>
          <CheckBox
            value={gender === 'other'}
            onValueChange={() => handleGenderChange('other')}
            tintColors={{ true: '#e91e63', false: '#aaa' }}
          />
          <Text style={styles.checkboxLabel}>Other</Text>
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
    borderRadius: 25,
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
