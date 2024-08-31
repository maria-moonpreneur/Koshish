import React, { useRef, useEffect, useCallback, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ImageBackground, Animated } from 'react-native';
import { useFonts, LexendDeca_700Bold } from '@expo-google-fonts/lexend-deca';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const AnimatedIcon = ({ name, size, isActive, label, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(isActive ? 1.2 : 1)).current;
  const opacityAnim = useRef(new Animated.Value(isActive ? 1 : 0.7)).current;
  const backgroundAnim = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: isActive ? 1.2 : 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: isActive ? 1 : 0.7,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundAnim, {
        toValue: isActive ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isActive]);

  const backgroundColor = backgroundAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', '#05BEC6'], // Active background color
  });

  return (
    <TouchableOpacity activeOpacity={1} style={styles.tabContainer} onPress={onPress}>
      <Animated.View style={[styles.iconTextContainer, { backgroundColor }]}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }], opacity: opacityAnim }}>
          <FontAwesome name={name} size={size} color={isActive ? "#fff" : "#000"} />
        </Animated.View>
        <Text style={[styles.label, { color: isActive ? "#fff" : "#000" }]}>{label}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const Feedback = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [feedback, setFeedback] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params;

  useFocusEffect(
    useCallback(() => {
      console.log('UserId in Feedback:', userId);
    }, [userId])
  );

  let [fontsLoaded] = useFonts({
    LexendDeca_700Bold,
    Inter_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const isActive = (screen) => route.name === screen;

  return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>FEEDBACK FORM</Text>

          <View style={styles.inputContainer}>
            <FontAwesome name="user" size={24} color="#333" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <FontAwesome name="envelope" size={24} color="#333" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email ID"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <FontAwesome name="phone" size={24} color="#333" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="phone-pad"
            />
          </View>

          <TextInput
            style={[styles.inputContainer, styles.feedbackInput]}
            placeholder="Your Feedback"
            value={feedback}
            onChangeText={setFeedback}
            multiline={true}
          />

          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomNavigation}>
        <AnimatedIcon
            name="comments"
            size={width * 0.08}
            isActive={isActive('Feedback')}
            label="Feedback"
            onPress={() => navigation.navigate('Feedback', {
              userId: userId,  // Pass the UserId as a prop
            })}
          />

          <AnimatedIcon
            name="phone"
            size={width * 0.08}
            isActive={isActive('Contact')}
            label="Contact"
            onPress={() => navigation.navigate('Contact', {
              userId: userId,  // Pass the UserId as a prop
            })}
          />

          <AnimatedIcon
            name="home"
            size={width * 0.08}
            isActive={isActive('Dashboard')}
            label="Home"
            onPress={() => navigation.navigate('Dashboard', {
              userId: userId,  // Pass the UserId as a prop
            })}
          />

          {/* <AnimatedIcon
            name="bar-chart"
            size={width * 0.08}
            isActive={isActive('Reports')}
            label="Reports"
            onPress={() => navigation.navigate('Reports', {
              userId: userId,  // Pass the UserId as a prop
            })}
          /> */}

          <AnimatedIcon
            name="user-circle"
            size={width * 0.08}
            isActive={isActive('UserData')}
            label="Profile"
            onPress={() => navigation.navigate('UserData', {
              userId: userId,  // Pass the UserId as a prop
            })}
          />
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#99E7E1',
  },
  innerContainer: {
    flex: 1,
    width: '90%',
    paddingHorizontal: '5%',
    alignItems: 'center',
    marginTop: height * 0.05,
    paddingVertical: '7%',
  },
  title: {
    fontSize: width * 0.069,
    fontFamily: 'LexendDeca_700Bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 10,
    width: '100%',
    marginBottom: 20,
    elevation: 5,
  },
  icon: {
    marginRight: 10,
    marginLeft: 10,
  },
  input: {
    flex: 1,
    height: height * 0.07,
    fontFamily: 'Inter_400Regular',
    fontSize: width * 0.04,
  },
  feedbackInput: {
    height: height * 0.21,
    textAlignVertical: 'top',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  submitButton: {
    backgroundColor: '#000000',
    borderRadius: 10,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: width * 0.05,
    fontFamily: 'Inter_400Regular',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#E9FEFF',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderRadius: 20,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  tabContainer: {
    flex: 1,
    alignItems: 'center',
  },
  iconTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  label: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default Feedback;
