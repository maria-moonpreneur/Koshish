import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, Animated, Alert } from 'react-native';
import { useFonts, LexendDeca_700Bold } from '@expo-google-fonts/lexend-deca';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';

const { width, height } = Dimensions.get('window');

const Family = ({ route, navigation }) => {
  const [familyType, setFamilyType] = useState('');
  const [progress] = useState(new Animated.Value(route.params.progress || 0.8)); // Initialize progress from passed value or default to 80%

  const { parentName, email, mobileNumber, address, childName, gender, dateOfBirth, motherTongue, fatherName, fatherProfession, motherName, motherProfession } = route.params; // Destructure received data

  let [fontsLoaded] = useFonts({
    LexendDeca_700Bold,
    Inter_400Regular,
  });

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 0.9, // Set progress to 90%
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

  const handleContinue = () => {
    if (!familyType) {
      Alert.alert('No Option Selected', 'Please select the type of family before continuing.');
      return;
    }

    console.log('Parent Name:', parentName);
    console.log('Email:', email);
    console.log('Mobile Number:', mobileNumber);
    console.log('Address:', address);
    console.log('Child Name:', childName);
    console.log('Gender:', gender);
    console.log('Date of Birth:', dateOfBirth.toDateString());
    console.log('Mother Tongue:', motherTongue);
    console.log('Father Name:', fatherName);
    console.log('Father Profession:', fatherProfession);
    console.log('Mother Name:', motherName);
    console.log('Mother Profession:', motherProfession);
    console.log('Family Type:', familyType);

    // Navigate to the next screen or perform further actions
    navigation.navigate('Complaint', {
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
    });
  };

  const handleSkip = () => {
    // Skip and move to the next screen without selecting family type
    console.log('Skipped Family Type Selection');
    navigation.navigate('Complaint', {
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
      familyType: '', // Pass empty or default value if skipped
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.progressBarContainer}>
          <Animated.View style={[styles.progressBarFill, { width: progressBarWidth }]} />
        </View>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Choose the Type of Family</Text>
      <View style={styles.optionContainer}>
        <TouchableOpacity
          style={[styles.option, familyType === 'Nuclear Family' && styles.selectedOption]}
          onPress={() => setFamilyType('Nuclear Family')}
        >
          <Image source={require('../assets/NuclearFamily.png')} style={styles.optionImage} />
          <Text style={styles.optionText}>Nuclear Family</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, familyType === 'Joint Family' && styles.selectedOption]}
          onPress={() => setFamilyType('Joint Family')}
        >
          <Image source={require('../assets/JointFamily.png')} style={styles.optionImage} />
          <Text style={styles.optionText}>Joint Family</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
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
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '85%',
    marginTop: 50,
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
    marginLeft: 10,
  },
  title: {
    fontSize: 22,
    fontFamily: 'LexendDeca_700Bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 30,
  },
  optionContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  option: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: height * 0.32,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    marginBottom: 15,
  },
  selectedOption: {
    borderColor: '#000',
  },
  optionImage: {
    width: '70%',
    height: '80%',
    marginBottom: 10,
  },
  optionText: {
    fontSize: 18,
    fontFamily: 'LexendDeca_700Bold',
    color: '#333',
    textAlign: 'center',
  },
  button: {
    width: '70%',
    height: 50,
    backgroundColor: '#000000',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
  },
});

export default Family;
