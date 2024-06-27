import React from 'react';
import { View, Text, StyleSheet, Image,ScrollView } from 'react-native';
import { Appbar, Card, Title, Paragraph } from 'react-native-paper';
import { router } from 'expo-router';

const AboutUs = () => {
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{ height: 40,marginTop:-15 }}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="About Us" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card style={styles.card}>
          <Card.Cover source={require('..//..//assets/app_icon.png')} style={styles.logo} />
          <Card.Content>
            <Title style={styles.title}>Shopscanner</Title>
            <Paragraph style={styles.paragraph}>
              Shopscanner scans top e-commerce platforms from India and sends the fastest price drop deals to our app.
            </Paragraph>
          </Card.Content>
        </Card>
        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Features</Text>
          <View style={styles.featureItem}>
            <Text style={styles.featureText}>Fastest price drop alerts</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureText}>Multiple e-commerce sources</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureText}>User-friendly interface</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
  },
  card: {
    marginVertical: 16,
    padding: 16,
  },
  logo: {
    alignSelf: 'center',
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 8,
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  featuresContainer: {
    marginVertical: 16,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIcon: {
    width: 32,
    height: 32,
    marginRight: 16,
  },
  featureText: {
    fontSize: 16,
  },
});

export default AboutUs;
