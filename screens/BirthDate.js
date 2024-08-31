import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Animated, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useFonts, LexendDeca_700Bold } from '@expo-google-fonts/lexend-deca';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';

const { width, height } = Dimensions.get('window');

const DateOfBirth = ({ route, navigation }) => {
  const [date, setDate] = useState(null); // Initialize date as null
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [progress] = useState(new Animated.Value(route.params.progress || 0.2)); // Initialize progress from passed value

  const { parentName, email, mobileNumber, address, childName, gender } = route.params; // Destructure received data

  let [fontsLoaded] = useFonts({
    LexendDeca_700Bold,
    Inter_400Regular,
  });

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 0.3, // Set progress to 30%
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

  const handleConfirm = (selectedDate) => {
    const currentDate = new Date();
    if (selectedDate > currentDate) {
      Alert.alert('Invalid Date', 'The birth date cannot be in the future.');
      setDatePickerVisibility(false);
      return;
    }
    setDate(selectedDate);
    setDatePickerVisibility(false);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleContinue = () => {
    if (!date) {
      Alert.alert('Date Not Selected', 'Please select the birth date before continuing.');
      return;
    }

    const currentDate = new Date();
    if (date > currentDate) {
      Alert.alert('Invalid Date', 'The birth date cannot be in the future.');
      return;
    }

    console.log('Parent Name:', parentName);
    console.log('Email:', email);
    console.log('Mobile Number:', mobileNumber);
    console.log('Address:', address);
    console.log('Child Name:', childName);
    console.log('Gender:', gender === 'boy' ? 'Male' : 'Female');
    console.log('Date of Birth:', date.toDateString());

    // Navigate to the next screen or perform further actions
    navigation.navigate('MotherTongueSelection', {
      parentName,
      email,
      mobileNumber,
      address,
      childName,
      gender: gender === 'boy' ? 'Male' : 'Female',
      dateOfBirth: date,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <Animated.View style={[styles.progressBarFill, { width: progressBarWidth }]} />
      </View>
      <Image source={require('../assets/BirthDate.png')} style={styles.birthdayImage} resizeMode="contain" />
      <Text style={styles.title}>When was {childName} born?</Text>
      <Text style={styles.subtitle}>
        We need {childName}'s birth date in order to ask the right questions according to their age group.
      </Text>
      <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
        <Text style={styles.dateText}>
          {date ? date.toDateString() : 'Click here to select date'}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={new Date(2000, 0, 1)} // Restricting date to start from 2000
      />
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
    justifyContent: 'flex-start',
    backgroundColor: '#97E7E1',
    padding: 10,
  },
  progressBarContainer: {
    width: '80%',
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginTop: 50,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#000',
  },
  birthdayImage: {
    width: width * 0.7,
    height: height * 0.5,
  },
  title: {
    fontSize: 25,
    fontFamily: 'LexendDeca_700Bold',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#666',
    textAlign: 'center',
    marginVertical: 20,
  },
  dateButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  dateText: {
    color: '#333',
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
  },
  button: {
    width: '60%',
    height: 50,
    backgroundColor: '#000000',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
  },
});

export default DateOfBirth;
