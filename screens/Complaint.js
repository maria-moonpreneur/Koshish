import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image, Animated, Alert } from 'react-native';
import { useFonts, LexendDeca_700Bold } from '@expo-google-fonts/lexend-deca';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import Toast from 'react-native-simple-toast';

const { width, height } = Dimensions.get('window');

const Complaint = ({ route, navigation }) => {
  const [complaint, setComplaint] = useState('');
  const [progress] = useState(new Animated.Value(route.params.progress || 0.9)); // Set to 100%

  const {
    parentName,
    email,
    mobileNumber,
    address,
    childName,
    gender,
    dateOfBirth,
    motherTongue,
    fatherName,
    fatherProfession,
    motherName,
    motherProfession,
    familyType,
  } = route.params;

  let [fontsLoaded] = useFonts({
    LexendDeca_700Bold,
    Inter_400Regular,
  });

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1, // Set progress to 100%
      duration: 1000, // Duration of the animation
      useNativeDriver: false, // Set to false for width animations
    }).start();
  }, []);

  const progressBarWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'], // Map the progress value to percentage
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  // Function to calculate age
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const now = new Date();
    const years = now.getFullYear() - birthDate.getFullYear();
    const months = now.getMonth() - birthDate.getMonth();
    const days = now.getDate() - birthDate.getDate();

    let ageString = '';
    if (years > 0) {
      ageString += `${years} ${years > 1 ? 'years' : 'year'}`;
      if (months > 0) {
        ageString += ` ${months} ${months > 1 ? 'months' : 'month'}`;
      }
    } else if (months > 0) {
      ageString += `${months} ${months > 1 ? 'months' : 'month'}`;
    } else {
      ageString = `${days} ${days > 1 ? 'days' : 'day'}`;
    }

    return ageString;
  };

  const handleRegister = async () => {
    try {
      // Generate random 6-digit UserId
      const userId = Math.floor(100000 + Math.random() * 900000);
  
      // Format dateOfBirth to the required format
      const formattedDOB = `${dateOfBirth.toISOString().split('T')[0]} 00:00:00.000`;
  
      // Calculate the age
      const age = calculateAge(dateOfBirth);
  
      const formData = new FormData();
      formData.append('UserId', userId.toString());
      formData.append('EmployeeName', 'App User');
      formData.append('Age', age);
      formData.append('ParentName', parentName);
      formData.append('EmailId', email);
      formData.append('Mobile', mobileNumber);
      formData.append('Addresss', address);
      formData.append('ChildName', childName);
      formData.append('ChildGender', gender);
      formData.append('ChildDOB', formattedDOB);
      formData.append('details.MotherTongue', motherTongue);
      formData.append('details.FathersFullName', fatherName);
      formData.append('details.FathersProfession', fatherProfession);
      formData.append('details.MothersFullName', motherName);
      formData.append('details.MothersProfession', motherProfession);
      formData.append('details.GeneralComplaint', complaint);
      formData.append('details.IsNuclearFamily', familyType === 'Nuclear Family');
      formData.append('details.IsJointFamily', familyType === 'Joint Family');
      formData.append('isActive', true);
  
      const response = await fetch('https://koshishcdc.com/api/User/Add', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'accept': '*/*',
        },
        body: formData,
      });
  
      const data = await response.json();
  
      if (data.response.result.message === 'User Created Successfully.') {
        Toast.show('Registration successful', Toast.LONG);
        setComplaint(''); // Clear the complaint field
        navigation.navigate('RegisterLogin', { 
          showLogin: true, 
          resetFields: true // Pass resetFields parameter to reset the fields in RegisterLogin
        });
      } else {
        Toast.show('An error occurred. Please try again.', Toast.LONG);
      }
    } catch (error) {
      Toast.show('An error occurred. Please try again.', Toast.LONG);
      console.error(error);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.progressBarContainer}>
          <Animated.View style={[styles.progressBarFill, { width: progressBarWidth }]} />
        </View>
      </View>

      <Image source={require('../assets/Complaint.png')} style={styles.image} />

      <Text style={styles.title}>Do you have any complaints?</Text>

      <TextInput
        style={styles.textbox}
        placeholder="Enter your complaint here..."
        multiline={true}
        value={complaint}
        onChangeText={setComplaint}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#97E7E1',
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  progressBarContainer: {
    flex: 1,
    height: 5,
    backgroundColor: '#A9A9A9',
    borderRadius: 5,
    overflow: 'hidden',
    marginRight: 10,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#000000',
  },
  skipText: {
    fontSize: 16,
    fontFamily: 'LexendDeca_700Bold',
    color: 'black',
  },
  title: {
    fontSize: 22,
    fontFamily: 'LexendDeca_700Bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 10,
  },
  image: {
    width: width * 0.7,
    height: height * 0.3,
    resizeMode: 'contain',
    marginTop: 20,
  },
  textbox: {
    width: '100%',
    height: height * 0.3,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  button: {
    width: '70%',
    height: 50,
    backgroundColor: '#000000',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
  },
});

export default Complaint;
