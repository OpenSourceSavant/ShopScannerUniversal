import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '@react-native-firebase/analytics';

const setupGoogleAnalytics = async () => {
  try {
    // Set device type (example with AsyncStorage)
    await AsyncStorage.setItem('device', 'android');

    // Initialize Firebase Analytics
    const analytics = firebase.analytics();
    
    // Enable analytics collection
    await analytics.setAnalyticsCollectionEnabled(true);

    console.log('Google Analytics setup completed.');
    return analytics; // Return analytics instance if needed globally
  } catch (error) {
    console.error('Error setting up Google Analytics:', error);
  }
};

export default setupGoogleAnalytics;
