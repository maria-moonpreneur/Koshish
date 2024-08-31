import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';

const { width, height } = Dimensions.get('window');

const GenderSelectionScreen = ({ route, navigation }) => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [progress] = useState(new Animated.Value(route.params.progress || 0.1)); // Initialize with passed progress value

  const { parentName, email, mobileNumber, address, childName } = route.params;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 0.2, // Set progress to 20%
      duration: 1000, // Duration of the animation
      useNativeDriver: false, // Set to false for width animations
    }).start();
  }, []);

  const progressBarWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'], // Map the progress value to percentage
  });

  const getFirstName = (name) => name.split(' ')[0];

  const firstName = getFirstName(childName);

  const handleContinue = () => {
    if (selectedGender) {
      console.log('Parent Name:', parentName);
      console.log('Email:', email);
      console.log('Mobile Number:', mobileNumber);
      console.log('Address:', address);
      console.log('Child Name:', childName);
      console.log('Selected Gender:', selectedGender);

      navigation.navigate('BirthDate', {
        parentName,
        email,
        mobileNumber,
        address,
        childName: firstName,
        gender: selectedGender,
      });
    } else {
      alert('Please select a gender');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <Animated.View style={[styles.progressBarFill, { width: progressBarWidth }]} />
      </View>

      <View style={styles.topImageContainer}>
        <Image
          source={require('../assets/Gender.png')}
          style={styles.topImage}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.questionText}>{`Is ${firstName} a girl or a boy?`}</Text>

      <View style={styles.genderOptionsContainer}>
        <TouchableOpacity
          style={[
            styles.genderOption,
            selectedGender === 'girl' && styles.selectedOption,
          ]}
          onPress={() => setSelectedGender('girl')}
        >
          <Image
            source={require('../assets/GirlGender.png')}
            style={styles.genderImage}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.genderOption,
            selectedGender === 'boy' && styles.selectedOption,
          ]}
          onPress={() => setSelectedGender('boy')}
        >
          <Image
            source={require('../assets/BoyGender.png')}
            style={styles.genderImage}
            resizeMode="contain"
          />
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
    justifyContent: 'flex-start',
    backgroundColor: '#97E7E1',
  },
  progressBarContainer: {
    width: '85%',
    height: 5,
    backgroundColor: '#A9A9A9',
    borderRadius: 5,
    marginTop: 50,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#000000',
  },
  topImageContainer: {
    width: width * 1.0,
    height: height * 0.38,
    marginTop: 30,
    alignContent: 'center',
  },
  topImage: {
    width: '100%',
    height: '100%',
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
  genderOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  genderOption: {
    width: width * 0.35,
    height: height * 0.2,
    backgroundColor: '#fff',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 10,
    elevation: 5,
  },
  selectedOption: {
    backgroundColor: '#E0F7FA',
    borderColor: '#000',
    borderWidth: 2,
  },
  genderImage: {
    width: '120%',
    height: '120%',
    borderRadius: 10,
  },
  button: {
    width: '80%',
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

export default GenderSelectionScreen;
