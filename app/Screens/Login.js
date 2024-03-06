import React,{useState} from 'react';
import { View, Image, Text,StyleSheet,TouchableOpacity,ActivityIndicator } from 'react-native';
import { Button,IconButton,TextInput,Snackbar  } from 'react-native-paper';
import { router,useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({onClose}) => {
  const navigation = useNavigation();
  const [showMobileNumberScreen, setShowMobileNumberScreen] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [otp, setOtp] = useState('');

  const validatePhoneNumber = () => {
    // Add your validation logic here
    return /^\d{10}$/.test(phoneNumber); // Example: 10 digits only
  };

  const handleSendOtp = () => {
    if (validatePhoneNumber()) {
      // Show loader
      setIsLoading(true);

      // Simulate sending OTP (replace with your actual OTP sending logic)
      setTimeout(() => {
        // After simulating OTP sending, hide loader and set isOtpSent to true
        setIsLoading(false);
        setSnackbarMessage(`OTP sent via SMS to ${phoneNumber}!`);
        setIsSnackbarVisible(true);

        setIsSnackbarVisible(true);
        setIsOtpSent(true);
      }, 1000); // Replace 2000 with the time it takes to send OTP in milliseconds
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
    // Check if OTP is correct (for example, let's assume the correct OTP is '1234')
    
    if (otp === '1234') {
      
      
      // Update login information in local storage
      try {
        
        await AsyncStorage.setItem('isLoggedIn', 'true');
        setSnackbarMessage(`Login InfoSaved`);
        setIsSnackbarVisible(true);
        // Call onClose to close the LoginScreen
        onClose();
        // You can also store other relevant login information if needed
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
      // Handle incorrect OTP (e.g., show error message)
    }
  };


  const handleMaybeLaterClick = () => {
    navigation.navigate('Home'); // Navigate to HomeScreen
  };

  const handleContinueWithOTP = () => {
    setShowMobileNumberScreen(true)
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
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
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
              onChangeText={text => setPhoneNumber(text)}
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
    {/* Background image */}
    <View style={styles.imageContainer}>
      <Image
        style={styles.backgroundImage}
        source={require('..//..//assets/splash.png')}
      />
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.contentContainer}>
      {/* Title */}
      <Text style={styles.title}>Unlock Exclusive Benefits</Text>

      {/* Description */}
      <Text style={styles.description}>
        Elevate your shopping experience with ShopScanner. Access personalized notifications, exclusive deals, and top-value savings!
      </Text>

      {/* Continue with OTP Button */}
      <Button
        style={styles.button}
        mode="contained"
        onPress={handleContinueWithOTP}>
        Continue with OTP
      </Button>

      {/* Maybe later */}
      <Text
        style={styles.maybeLater}
        onPress={handleMaybeLaterClick}>
        Maybe later
      </Text>

      {/* Terms of Service and Privacy Policy */}
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

      {/* Snackbar */}
      <Snackbar
        visible={isSnackbarVisible}
        onDismiss={() => setIsSnackbarVisible(false)}
        duration={2000} // Adjust the duration as needed
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
    color: '#333', // Darker color for better readability
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    marginBottom: 32,
    fontSize: 16,
    color: '#555', // Slightly lighter color
  },
  button: {
    marginTop: 16,
    width: '100%',
    backgroundColor: '#3498db', // A cool blue color
  },
  maybeLater: {
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 24,
    textDecorationLine: 'underline', // Underline the text to indicate it's clickable
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
    height: 40,
    
    paddingHorizontal: 10,
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
    paddingTop: 20, // Adjust the paddingTop as needed
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
