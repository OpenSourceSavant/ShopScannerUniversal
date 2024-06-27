import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { router } from 'expo-router'; 

const notificationsData = [];

const NotificationScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);


    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Appbar.Header style={styles.appbarHeader}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Text style={styles.appbarTitle}>Notification</Text>
        <View style={{ flex: 1 }}></View>
      </Appbar.Header>

      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View style={styles.noNotificationsContainer}>
            <Text style={styles.noNotificationsText}>No notifications</Text>
            <Text style={styles.additionalText}>Your price drop and notifications will appear here</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appbarHeader: {
    height: 40,
    marginTop: -15,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
  },
  appbarTitle: {
    fontSize: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noNotificationsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding:20,
    flex:1
    
  },
  noNotificationsText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  additionalText: {
    marginTop: 8,
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});

export default NotificationScreen;
