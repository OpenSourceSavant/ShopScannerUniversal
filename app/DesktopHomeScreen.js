import React, { useRef } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import logo from '../assets/icon.png';
import amazonLogo from '../assets/amazon_logo.png';
import myntraLogo from '../assets/myntra_logo.png';
import nykaaLogo from '../assets/nykaa_logo.png';
import ajioLogo from '../assets/ajio_logo.png';
import tiraLogo from '../assets/tira_logo.png';
import plumLogo from '../assets/Plum.jpeg';
import zivameLogo from '../assets/zivame.png';

import heroImage from '../assets/hero-right-image.png';
import phopo from '../assets/phopo.png';

import googlePlayBadge from '../assets/google-play-badge.png';
import appleBadge from '../assets/AppleBadge.svg';

import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const DesktopHomeScreen = () => {
  const scrollViewRef = useRef();

  const scrollToSection = (offsetY) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: offsetY, animated: true });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.navLinks}>
          <TouchableOpacity onPress={() => scrollToSection(0)}>
            <Text style={styles.navLink}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => scrollToSection(height - 5)}>
            <Text style={styles.navLink}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => scrollToSection(height * 1.8)}>
            <Text style={styles.navLink}>Features</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => scrollToSection(height * 3.28)}>
            <Text style={styles.navLink}>Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.getAppButton}>
            <Text style={styles.getAppText}>Get App</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={{ marginTop: 90 }}>
          <View style={styles.heroSection}>
            <View style={styles.heroContent}>
              <View style={styles.heroMain}>
                <View style={styles.heroLeft}>
                  <Text style={styles.heroTitle}>Discover the <Text style={styles.boldText}>Best Deals</Text> with Elegance!</Text>
                  <Text style={styles.heroDescription}>
                    Shop smarter, not harder. Introducing ShopScanner, your ultimate shopping BFF.
                  </Text>
                  <Text style={styles.heroSubDescription}>
                    Join thousands of happy shoppers who are saving big with our app!
                  </Text>
                  <Text style={styles.heroHighlight}>
                    - Get exclusive offers from top brands!
                  </Text>
                  <Text style={styles.heroHighlight}>
                    - Never miss a discount with real-time alerts!
                  </Text>
                  <Text style={styles.heroHighlight}>
                    - Experience the joy of seamless shopping!
                  </Text>
                  <View style={styles.downloadButtons}>
                    <TouchableOpacity>
                      <Image source={googlePlayBadge} style={styles.downloadButtonGoogle} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.downloadButton}>
                      <Image source={appleBadge} style={styles.downloadButtonApple} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.heroRight}>
                  <Image source={heroImage} style={styles.heroImage} />
                </View>
              </View>
            </View>
          </View>

          {/* Featured Stores Section */}
          <View style={styles.storesSection}>
            <Text style={styles.sectionTitle}>Featured Stores</Text>
            <View style={styles.storesLogosContainer}>
              <View style={styles.storeLogoWrapper}>
                <Image source={amazonLogo} style={styles.storeLogo} />
              </View>
              <View style={styles.storeLogoWrapper}>
                <Image source={myntraLogo} style={styles.storeLogo} />
              </View>
              <View style={styles.storeLogoWrapper}>
                <Image source={nykaaLogo} style={styles.storeLogo} />
              </View>
              <View style={styles.storeLogoWrapper}>
                <Image source={ajioLogo} style={styles.storeLogo} />
              </View>
              <View style={styles.storeLogoWrapper}>
                <Image source={tiraLogo} style={styles.storeLogo} />
              </View>
            </View>

            <View style={styles.storesLogosContainer}>
              <View style={styles.storeLogoWrapper}>
                <Image source={plumLogo} style={styles.storeLogo} />
              </View>
              <View style={styles.storeLogoWrapper}>
                <Image source={zivameLogo} style={styles.storeLogo} />
              </View>
              <View style={styles.storeLogoWrapper}>
                <Image source={nykaaLogo} style={styles.storeLogo} />
              </View>
              <View style={styles.storeLogoWrapper}>
                <Image source={ajioLogo} style={styles.storeLogo} />
              </View>
              <View style={styles.storeLogoWrapper}>
                <Image source={tiraLogo} style={styles.storeLogo} />
              </View>
            </View>
          </View>

          {/* Features Section */}
          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>Features</Text>
            <View style={styles.featureCardsContainer}>
              <View style={styles.featureCard}>
                <Ionicons name="notifications-outline" size={50} color="#8B008B" />
                <Text style={styles.featureCardTitle}>Real-time Deal Alerts</Text>
                <Text style={styles.featureCardDescription}>
                  Get notified the moment a price drops or a limited-edition offer launches.
                </Text>
              </View>
              <View style={styles.featureCard}>
                <Ionicons name="speedometer-outline" size={50} color="#8B008B" />
                <Text style={styles.featureCardTitle}>Get Fastest Deals</Text>
                <Text style={styles.featureCardDescription}>
                  Access the quickest deals and discounts from top e-commerce platforms.
                </Text>
              </View>
              <View style={styles.featureCard}>
                <Ionicons name="cart-outline" size={50} color="#8B008B" />
                <Text style={styles.featureCardTitle}>Easy Shopping Experience</Text>
                <Text style={styles.featureCardDescription}>
                  Our app offers a seamless shopping experience with quick deal updates, intuitive navigation, and secure checkout options.
                </Text>
              </View>
            </View>
          </View>

          {/* Plan Section */}
          <View style={styles.planSection}>
            <View style={styles.planContent}>
              <Text style={styles.sectionTitle}>Easy Shopping Experience</Text>
              <Text style={styles.sectionDescription}>
                Our app offers a seamless shopping experience with quick deal updates, intuitive navigation, and secure checkout options.
              </Text>
              <Image source={phopo} style={styles.appScreenshot} />
            </View>
          </View>

          {/* Footer Section */}
          <View style={styles.footerSection}>
            <Text style={styles.footerTitle}>Download ShopScanner & Enjoy Shopping!</Text>
            <Text style={styles.footerDescription}>
              Get the app today and start saving on your favorite products from top e-commerce sites.
            </Text>
            <TouchableOpacity style={styles.footerButton}>
              <Text style={styles.footerButtonText}>Get App</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  heroSection: {
    backgroundColor: '#FFF0F5',
    height: 650,
  },
  heroContent: {
    paddingHorizontal: 20,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 30,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    height: 90,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  logo: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navLink: {
    color: '#333',
    marginHorizontal: 25,
    fontSize: 18,
    fontWeight: '600',
  },
  getAppButton: {
    backgroundColor: '#8B008B',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 50,
  },
  getAppText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  heroMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  heroLeft: {
    flex: 1,
    justifyContent: 'center',
  },
  heroRight: {
    flex: 1,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 40,
    color: '#000',
    marginVertical: 20,
    fontWeight: 'bold',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#8B008B',
  },
  heroDescription: {
    fontSize: 19,
    color: '#555',
    fontWeight: '400',
  },
  heroSubDescription: {
    fontSize: 18,
    color: '#555',
    fontWeight: '400',
    marginTop: 10,
  },
  heroHighlight: {
    fontSize: 18,
    color: '#8B008B',
    fontWeight: '600',
    marginTop: 5,
  },
  downloadButtons: {
    flexDirection: 'row',
    marginTop: 40,
  },
  downloadButtonGoogle: {
    width: 200,
    height: 60,
    resizeMode: 'contain',
  },
  downloadButtonApple: {
    width: 200,
    height: 60,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  heroImage: {
    width: 450,
    height: 450,
    resizeMode: 'contain',
    marginTop:50
  },
  storesSection: {
    padding: 50,
    alignItems: 'center',
    backgroundColor: '#FFF0F5',
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#8B008B',
    marginBottom: 30,
  },
  storesLogosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  storeLogoWrapper: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    borderWidth: 1,
    borderColor: '#8B008B',
  },
  storeLogo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  featuresSection: {
    padding: 50,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  featureCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  featureCard: {
    width: '30%',
    backgroundColor: '#FFF0F5',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      height: 2,
      width: 0,
    },
  },
  featureCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B008B',
    marginTop: 10,
  },
  featureCardDescription: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
    textAlign: 'center',
  },
  planSection: {
    backgroundColor: '#F5F5F5',
    padding: 20,
    position: 'relative',
    height: 700,
  },
  planContent: {
    padding: 20,
    zIndex: 1,
  },
  appScreenshot: {
    width: '100%',
    height: 500,
    resizeMode: 'contain',
    marginTop: 20,
  },
  footerSection: {
    padding: 80,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  footerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  footerDescription: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  footerButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 20,
  },
  footerButtonText: {
    color: '#8B008B',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DesktopHomeScreen;
