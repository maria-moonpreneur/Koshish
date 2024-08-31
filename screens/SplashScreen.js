import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, Text, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LexendDeca_700Bold } from '@expo-google-fonts/lexend-deca';
import { DMSans_500Medium } from '@expo-google-fonts/dm-sans';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    LexendDeca_700Bold,
    DMSans_500Medium,
  });

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (hasLaunched === null) {
          // This is the first launch
          await AsyncStorage.setItem('hasLaunched', 'true');
          navigation.replace('Launch');  // Navigate to Launch screen
        } else {
          // Not the first launch
          navigation.replace('RegisterLogin');  // Navigate to RegisterLogin screen
        }
      } catch (error) {
        console.error('Error checking first launch:', error);
      }
    };

    const timer = setTimeout(() => {
      checkFirstLaunch();
    }, 4000); // 4 seconds delay for the splash screen

    return () => clearTimeout(timer);
  }, [navigation]);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Koshish_Logo.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>KOSHISH</Text>
      <Text style={styles.subtitle}>CHILD DEVELOPMENT CENTRE</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: width * 0.8, // Adjust based on your image
    height: height * 0.5, // Adjust based on your image
  },
  title: {
    fontSize: width * 0.15, // Adjust font size as needed
    fontFamily: 'LexendDeca_700Bold',
    color: '#B95032', // Adjust color as needed
    marginTop: 20, // Adjust margin as needed
  },
  subtitle: {
    fontFamily: 'DMSans_500Medium',
    fontSize: width * 0.05, // Adjust font size as needed
    color: '#B95032', // Adjust color as needed
    marginTop: 10, // Adjust margin as needed
  },
});

export default SplashScreen;
