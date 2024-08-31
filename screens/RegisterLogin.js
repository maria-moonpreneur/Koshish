// mongodb+srv://koshishapp:qUBZAs77sL1by0bR@user-data.edhe9is.mongodb.net/?retryWrites=true&w=majority&appName=User-Data
// S819hf79Dfa4LSJghQ7PBjquxHuxMBe9iX73jU2Xn2zTnxULTMWB8jnOohu7qh4l

// Script for Registerations
// https://script.google.com/macros/s/AKfycbyo9R1BBS48I2fC3yCkHSyJIDKeFr_srwyEyoGSHpDf4Ye4nEsle0P8P6lWFh6S9sA/exec

import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LexendDeca_700Bold } from '@expo-google-fonts/lexend-deca';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import { useFonts } from 'expo-font';
import Toast from 'react-native-simple-toast';
import { useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const RegisterLogin = ({ route, navigation }) => {
  const [isLogin, setIsLogin] = useState(route.params?.showLogin || false);
  const [loginMobileNumber, setLoginMobileNumber] = useState('');
  const [registrationMobileNumber, setRegistrationMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [parentName, setParentName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  let [fontsLoaded] = useFonts({
    LexendDeca_700Bold,
    Inter_400Regular,
  });

  useFocusEffect(
    useCallback(() => {
      if (route.params?.resetFields) {
        setLoginMobileNumber('');
        setOtp('');
        setParentName('');
        setEmail('');
        setRegistrationMobileNumber('');
        setAddress('');
      }
    }, [route.params?.resetFields])
  );

  if (!fontsLoaded) {
    return null;
  }

  const validateMobileNumber = (number) => {
    return /^\d{10}$/.test(number);
  };

  const validateName = (name) => {
    return /^[A-Za-z\s]+$/.test(name);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleGenerateOtp = async () => {
    if (!validateMobileNumber(loginMobileNumber)) {
      Toast.show('Invalid Mobile Number. Please enter a valid 10-digit mobile number.', Toast.LONG);
      return;
    }
  
    const formData = new FormData();
    formData.append('Mobile_Email', loginMobileNumber);
  
    try {
      const response = await fetch('https://koshishcdc.com/api/Account/SendOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'accept': '*/*',
        },
        body: formData,
      });
  
      const result = await response.json();
  
      if (result.statuscode === 200 && result.message !== "User doesn't exist. Register to continue") {
        Toast.show('OTP Sent Successfully', Toast.LONG);
      }
      if (result.statuscode === 500 && result.message === "User doesn't exist. Register to continue") {
        Toast.show('Registration Error. User doesn\'t exist. Please register to continue.', Toast.LONG);
      } 
    } catch (error) {
      Toast.show('An error occurred. Please try again.', Toast.LONG);
    }
  };

  const handleVerifyOtp = async () => {
    if (!validateMobileNumber(loginMobileNumber)) {
      Toast.show('Invalid Mobile Number. Please enter a valid 10-digit mobile number.', Toast.LONG);
      return;
    }

    const formData = new FormData();
    formData.append('MobileEmail', loginMobileNumber);
    formData.append('otp', otp);
    formData.append('IsWeb', 'false');

    try {
      const response = await fetch('https://koshishcdc.com/api/Account/VerifyOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'accept': '*/*',
        },
        body: formData,
      });

      const result = await response.json();

      if (result.status === 'Ok' && response.status === 200) {
        navigation.navigate('Dashboard', {
          userId: result.userId,  // Pass the UserId as a prop
        });
        console.log('UserId:', result.userId);
        console.log('Token:', result.token);
      } else {
        Toast.show('Invalid OTP. Please try again.', Toast.LONG);
      }
    } catch (error) {
      Toast.show('An error occurred. Please try again.', Toast.LONG);
    }
  };

  const handleContinue = () => {
    if (!validateName(parentName)) {
      Toast.show('Invalid Name. Name should contain only letters and spaces.', Toast.LONG);
      return;
    }

    if (!validateEmail(email)) {
      Toast.show('Invalid Email. Please enter a valid email address.', Toast.LONG);
      return;
    }

    if (!validateMobileNumber(registrationMobileNumber)) {
      Toast.show('Invalid Mobile Number. Please enter a valid 10-digit mobile number.', Toast.LONG);
      return;
    }

    // Navigate to the next screen and pass the registration data
    navigation.navigate('ChildName', {
      parentName,
      email,
      mobileNumber: registrationMobileNumber,
      address,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.imageContainer}>
          <Image source={require('../assets/LoginBoy.png')} style={styles.image} resizeMode="contain" />
        </View>
        <View style={styles.formContainer}>
          <View style={styles.tabContainer}>
            <TouchableOpacity onPress={() => setIsLogin(false)}>
              <Text style={[styles.tabText, !isLogin && styles.activeTabText]}>SIGN UP</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsLogin(true)}>
              <Text style={[styles.tabText, isLogin && styles.activeTabText]}>LOGIN</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.form}>
            {isLogin ? (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="MOBILE NUMBER*"
                  value={loginMobileNumber}
                  onChangeText={setLoginMobileNumber}
                  keyboardType="numeric"
                />
                <TouchableOpacity style={styles.generateOtpButton} onPress={handleGenerateOtp}>
                  <Text style={styles.generateOtpText}>Generate OTP</Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  placeholder="ENTER OTP*"
                  value={otp}
                  onChangeText={setOtp}
                  keyboardType="numeric"
                />
                <TouchableOpacity style={styles.primaryButton} onPress={handleVerifyOtp}>
                  <Text style={styles.primaryButtonText}>Login</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="PARENT NAME*"
                  value={parentName}
                  onChangeText={setParentName}
                />
                <TextInput
                  style={styles.input}
                  placeholder="EMAIL ID*"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
                <TextInput
                  style={styles.input}
                  placeholder="MOBILE NUMBER*"
                  value={registrationMobileNumber}
                  onChangeText={setRegistrationMobileNumber}
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.input}
                  placeholder="ADDRESS"
                  value={address}
                  onChangeText={setAddress}
                />
                <TouchableOpacity style={styles.primaryButton} onPress={handleContinue}>
                  <Text style={styles.primaryButtonText}>Continue</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DAFFFB',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.5, // Set the height to 50% of the screen height
    alignItems: 'center',
    zIndex: -1,
  },
  image: {
    width: width * 1.5, // Increase width to 150% of the screen width
    height: height * 0.6, // Increase height to 80% of the screen height
  },
  formContainer: {
    marginTop: height * 0.4, // Push the form down to overlap with the image
    width: '100%',
    height: height * 0.6, // Cover the remaining 60% of the screen
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderRadius: 30,
    paddingVertical: 20,
    alignItems: 'center',
    zIndex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginBottom: 30,
  },
  tabText: {
    fontSize: 18,
    fontFamily: 'LexendDeca_700Bold',
    color: '#888888',
  },
  activeTabText: {
    color: '#000000',
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
  },
  form: {
    width: '100%',
    flex: 1, // Ensures the form takes up the entire remaining space
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    paddingVertical: 10,
    marginBottom: 20,
  },
  generateOtpButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  generateOtpText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#000000',
  },
  primaryButton: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
  },
});

export default RegisterLogin;
