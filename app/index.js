import React from 'react';
import { View, Pressable, Text, Platform ,Dimensions,SafeAreaView  } from 'react-native';
import { Link, useRouter } from 'expo-router';
import MobileStack from './MobileStack';
import { PaperProvider } from 'react-native-paper';
import MobileWebStack from './MobileWebStack';


const DesktopStack = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.replace('/login');
  };

  return (
    <>
      {/* Navigation using Link */}
      <Link href="/about">About Desktop</Link>
      <Link href={{ pathname: '/user/[id]', params: { id: 'bacon' } }}>View User</Link>

      {/* Imperative Navigation */}
      <Pressable onPress={handleLogout}>
        <Text>Logout</Text>
      </Pressable>

      {/* Replacing Screens */}
      <Link replace href="/feed">
        <Text>Login</Text>
      </Link>
    </>
  );
};

const HomePage = () => {
  const isWebMobile = Platform.OS === 'web' && Dimensions.get('window').width <= 786;
  const isMobile = Platform.OS === 'android' || Platform.OS === 'ios';
  const isDesktop = Platform.OS === 'web' && Dimensions.get('window').width >= 1024;

  return (
    <PaperProvider>

    <SafeAreaView style={{ flex: 1 }}>

    <View style={{ flex: 1 }}>

      {isWebMobile && <MobileWebStack />}
      {isMobile && <MobileStack />}
      {isDesktop && <DesktopStack />}
    </View>
    </SafeAreaView>
    </PaperProvider>


  );
};

export default HomePage;
