import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Payment = () => {
  const [parentName, setParentName] = useState('');
  const [childName, setChildName] = useState('');
  const [amount, setAmount] = useState(500); // You can set the amount dynamically based on the test type

  const navigation = useNavigation();
  const route = useRoute();
  const { userId, testName } = route.params;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://koshishcdc.com/api/User/GetUserDetails?UserId=${userId}`);
        const json = await response.json();
        setParentName(json.response.parentName.trim());
        setChildName(json.response.childName.trim());
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handlePaymentOption = (option) => {
    if (option === 'Internet Banking') {
      navigation.navigate('Failure', { userId, testName });
    } else {
      navigation.navigate('Success', { userId, testName });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.boldText}>Parent Name: </Text>
          <Text style={styles.infoText}>{parentName}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.boldText}>Child Name: </Text>
          <Text style={styles.infoText}>{childName}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>You are about to pay </Text>
          <Text style={styles.boldText}>Rs. {amount}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>{` for the ${testName}`}</Text>
        </View>

        <Text style={styles.chooseText}>Choose Payment Option</Text>

        <TouchableOpacity style={styles.optionButton} onPress={() => handlePaymentOption('Debit/Credit Card')}>
          <Text style={styles.optionText}>Debit/Credit Card</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={() => handlePaymentOption('Internet Banking')}>
          <Text style={styles.optionText}>Internet Banking</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={() => handlePaymentOption('UPI')}>
          <Text style={styles.optionText}>UPI</Text>
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
  infoContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'center',
  },
  boldText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  infoText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  chooseText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  optionButton: {
    backgroundColor: '#A7F3D0',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    color: '#000',
  },
});

export default Payment;
