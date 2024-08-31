import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView, KeyboardAvoidingView, Platform, Alert, Animated } from 'react-native';
import { useFonts, LexendDeca_700Bold } from '@expo-google-fonts/lexend-deca';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';

const { width, height } = Dimensions.get('window');

const ChildName = ({ route, navigation }) => {
  const [childName, setChildName] = useState('');
  const [progress] = useState(new Animated.Value(0)); // Animated value for progress bar
  let [fontsLoaded] = useFonts({
    LexendDeca_700Bold,
    Inter_400Regular,
  });

  const { parentName, email, mobileNumber, address } = route.params;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 0.1, // Set progress to 10%
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

  const validateChildName = (name) => /^[A-Za-z\s]+$/.test(name);

  const handleContinue = () => {
    if (!validateChildName(childName)) {
      Alert.alert('Invalid Name', "Child's name should contain only letters and spaces.");
      return;
    }

    console.log('Parent Name:', parentName);
    console.log('Email:', email);
    console.log('Mobile Number:', mobileNumber);
    console.log('Address:', address);
    console.log('Child Name:', childName);

    navigation.navigate('Gender', {
      parentName,
      email,
      mobileNumber,
      address,
      childName,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View style={styles.progressBarContainer}>
            <Animated.View style={[styles.progressBarFill, { width: progressBarWidth }]} />
          </View>
          <View style={styles.roundedRectangle} />
          <Image source={require('../assets/Name.png')} style={styles.image} resizeMode="contain" />
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Enter your child's name</Text>
            <Text style={styles.subtitle}>Or a nickname. This will help us personalize your app experience.</Text>
            <TextInput
              style={styles.input}
              placeholder="Your child's name"
              value={childName}
              onChangeText={setChildName}
            />
            <TouchableOpacity style={styles.button} onPress={handleContinue}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#97E7E1',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
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
  roundedRectangle: {
    position: 'absolute',
    width: width * 0.85,
    height: height * 0.25,
    backgroundColor: '#DAFFFB',
    opacity: 0.7,
    borderRadius: 70,
    top: height * 0.40,
    transform: [{ translateY: -(height * 0.15) }],
  },
  image: {
    width: width,
    height: height * 0.51,
    marginTop: 20,
  },
  contentContainer: {
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: 'LexendDeca_700Bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    backgroundColor: '#fff',
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

export default ChildName;
