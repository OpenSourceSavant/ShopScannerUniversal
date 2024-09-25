import { Platform } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
// Configure Google Sign-In
const iosClientId = '<YOUR_IOS_CLIENT_ID>';
const androidClientId = '<YOUR_ANDROID_CLIENT_ID>';

if (Platform.OS === 'android') {
  GoogleSignin.configure({
    webClientId: androidClientId,
    offlineAccess: true,
  });
} else if (Platform.OS === 'ios') {
  GoogleSignin.configure({
    webClientId: iosClientId,
    offlineAccess: true,
  });
}

export async function signInWithGoogle() {
  try {
    const result = await GoogleSignin.signIn();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
