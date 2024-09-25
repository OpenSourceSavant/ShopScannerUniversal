import React from 'react';
import { View, Button } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

const LoginNew = () => {

    const signIn = async () => {
        try {
            GoogleSignin.configure()
            await GoogleSignin.hasPlayServices();
            
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo);
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('Sign-in cancelled');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Sign-in in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Play services not available');
            } else {
                console.log(error);
            }
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title="Google Sign-In" onPress={signIn} />
        </View>
    );
};

export default LoginNew;
