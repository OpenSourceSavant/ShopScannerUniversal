import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Linking } from 'react-native';
import logo from '..//assets/icon.png';

const Support = () => {
  useEffect(() => {
    // Add any additional initialization logic or API calls if needed
  }, []);

  const handleEmailPress = () => {
    // Open email link in default email client
    Linking.openURL('mailto:contact-us@theshopscanner.com');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>

      <View style={styles.blogContainer}>
        <Text style={styles.supportText}>Contact Us</Text>

        <View style={styles.border} />

        <Text style={styles.blogText}>
          Welcome to our support page! If you have any issues, questions, or feedback regarding our app or any other matter, please feel free to reach out to us. We value your input and aim to provide the best support possible.
        </Text>

        <Text style={styles.blogText}>
          For any inquiries or assistance, you can contact us via email at{' '}
          <Text style={styles.emailLink} onPress={handleEmailPress}>
            contact-us@theshopscanner.com
          </Text>
          .
        </Text>

        <Text style={styles.blogText}>
          At The Shop Scanner, our mission is to simplify your shopping experience. We strive to create a user-friendly and reliable app that enhances your shopping journey. Your satisfaction is our priority, and we are dedicated to addressing your needs and concerns.
        </Text>

        <Text style={styles.blogText}>
          Whether you have questions about app features, need technical assistance, or want to share your thoughts on how we can improve, we encourage you to connect with us. Your feedback helps us grow and ensures that The Shop Scanner continues to meet your expectations.
        </Text>

        <Text style={styles.blogText}>
          Thank you for choosing The Shop Scanner. We look forward to serving you better and appreciate the opportunity to be part of your shopping experience.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 3,
    height: 70,
    paddingHorizontal: 16,
  },
  logo: {
    width: 64,
    height: 64,
    marginRight: 10,
  },
  blogContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4', // Very light grey background
    borderRadius: 8,
    margin: 10,
  },
  border: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  supportText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  blogText: {
    marginBottom: 16,
  },
  emailLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default Support;
