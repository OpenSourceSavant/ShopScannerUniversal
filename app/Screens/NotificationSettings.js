import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { router } from 'expo-router';

const NotificationSettings = () => {

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{height: 40, marginTop: -15}}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Notification Settings" />
      </Appbar.Header>
      <View style={styles.container}>
        <Text style={styles.text}>Notification Settings Screen</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});

export default NotificationSettings;
