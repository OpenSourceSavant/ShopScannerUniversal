import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import * as BackgroundFetch from 'expo-background-fetch';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the task name
const LOCATION_TASK_NAME = 'background_location_task';

// Define the background task globally
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error('Background task error:', error);
    return;
  }

  if (data) {
    //const { locations } = data;
    //const deviceId = await AsyncStorage.getItem('deviceId');
    //console.log(deviceId)
    //console.log('Location data in background:', locations);
    // Handle the location data (e.g., send it to a server or save it)
  }
});

// Register the location task with BackgroundFetch
export async function registerLocationTask() {
  // Check if TaskManager is available
  const isTaskManagerAvailable = await TaskManager.isAvailableAsync();
  if (!isTaskManagerAvailable) {
    console.error('TaskManager is not available on this device.');
    return;
  }

  // Request permissions
  const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
  if (foregroundStatus !== 'granted') {
    console.log('Foreground location permission not granted');
    return;
  }

  const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
  if (backgroundStatus !== 'granted') {
    console.log('Background location permission not granted');
    return;
  }

  // Register the BackgroundFetch task
  await BackgroundFetch.registerTaskAsync(LOCATION_TASK_NAME, {
    minimumInterval: 30, // 60 seconds (1 minute)
    stopOnTerminate: false, // Continue running after app is terminated
    startOnBoot: true, // Start task when device boots
  });

  // Start location updates
  await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
    accuracy: Location.Accuracy.Balanced,
    timeInterval: 30 * 1000, // 1 minute in milliseconds
    distanceInterval: 0, // Update whenever the location changes
    showsBackgroundLocationIndicator: true,
  });
}


