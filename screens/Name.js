import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image, ImageBackground } from 'react-native';
import { useFonts, LexendDeca_700Bold } from '@expo-google-fonts/lexend-deca';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';

const { width, height } = Dimensions.get('window');

const CustomScreen = () => {
  const [childName, setChildName] = useState('');
  let [fontsLoaded] = useFonts({
    LexendDeca_700Bold,
    Inter_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ImageBackground source={require('../assets/Shape.png')} style={styles.background}>
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarFill} />
      </View>
      <View style={styles.roundedRectangle} />
        <Image source={require('../assets/file.png')} style={styles.image} resizeMode="contain" />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Enter your child's name</Text>
        <Text style={styles.subtitle}>Or a nickname. This will help us personalize your app experience.</Text>
        <TextInput
          style={styles.input}
          placeholder="Your child's name"
          value={childName}
          onChangeText={setChildName}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  progressBarContainer: {
    width: '85%',
    height: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginTop: 50,
    overflow: 'hidden',
  },
  progressBarFill: {
    width: '10%', // Adjust this width to represent the progress
    height: '100%',
    backgroundColor: '#000',
  },
  roundedRectangle: {
    position: 'absolute',
    width: width * 0.85, // 90% of screen width
    height: height * 0.25, // 34% of screen height
    backgroundColor: '#DAFFFB',
    opacity: 0.7,
    borderRadius: 70,
    top: height * 0.40, // Adjust based on screen height
    transform: [{ translateY: -(height * 0.15) }], // Adjust based on rectangle height
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
    width: '100%',
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

export default CustomScreen;