import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Success = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { testName, userId } = route.params; // Get the testName and userId passed from the Payment screen

  const handlePress = () => {
    // Navigate to the specific test based on testName and userId using replace
    if (testName === 'ELA-RLA Test') {
      navigation.replace('ELARLATest', { userId }); // Replace with RLATest screen, passing userId
    } else if (testName === 'Autism Test') {
      navigation.replace('AutismTest', { userId }); // Replace with AutismTest screen, passing userId
    } else {
      navigation.replace('Dashboard', { userId }); // Default fallback, replacing with Dashboard
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          source={require('../assets/success-icon.png')} // Replace with the correct path to your success image
          style={styles.successIcon}
        />
        <Text style={styles.titleText}>Payment Successful!</Text>
        <Text style={styles.messageText}>
          Congratulations on your payment, you can now take the {testName} assessment.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>OK, let’s do it!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#99E7E1',
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
    backgroundColor: '#000000',
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

export default Success;
