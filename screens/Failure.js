import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Failure = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId, testName } = route.params; // Get the userId and testName passed from the Payment screen

  const handleRetry = () => {
    // Navigate to the Dashboard with the userId as a prop
    navigation.navigate('Dashboard', { userId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
            source={require('../assets/failure-icon.png')} // Replace with the correct path to your success image
            style={styles.successIcon}
        />
        <Text style={styles.titleText}>Payment Failed!</Text>
        <Text style={styles.messageText}>
          Unfortunately, your payment for the {testName} assessment could not be processed. Please try again.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleRetry}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFB3B3',
    padding: 20,
  },
  innerContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  successIcon: {
    width: 100, // Adjust the size based on your image
    height: 100,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 10,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#FF5C5C',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default Failure;
