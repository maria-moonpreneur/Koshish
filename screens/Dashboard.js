import React, { useRef, useEffect, useCallback, useState } from 'react';
import { View, Text, Animated, TouchableOpacity, StyleSheet, Dimensions, Image, BackHandler, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';


const { width } = Dimensions.get('window');

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

const Dashboard = ({route}) => {
  const [parentName, setParentName] = useState('');
  const navigation = useNavigation();
  const currentRoute = useRoute();
  const { userId } = route.params;

  useEffect(() => {
    // Fetch parent name from the API
    const fetchParentName = async () => {
      try {
        const response = await fetch(`https://koshishcdc.com/api/User/GetUserDetails?UserId=${userId}`);
        const json = await response.json();
        setParentName(json.response.parentName.trim()); // Trim any trailing spaces
      } catch (error) {
        console.error('Failed to fetch parent name:', error);
      }
    };

    fetchParentName();
  }, [userId]);

  const isActive = (screen) => currentRoute.name === screen;

  useFocusEffect(
    useCallback(() => {
      console.log('UserId in Dashboard:', userId);
    }, [userId])
  );

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          "Exit",
          "Are you sure you want to exit?",
          [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel"
            },
            { text: "YES", onPress: () => navigation.navigate('RegisterLogin', { resetFields: true }) }
          ],
          { cancelable: false }
        );
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.welcomeText}>{`Hi ${parentName},\nWelcome`}</Text>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Payment', {
          userId,  // Pass the UserId as a prop
          testName: 'ELA-RLA Test',
        })}>
            <Image source={require('../assets/Test.png')} style={styles.cardImage} />
            <Text style={styles.cardText}>Take the ELA-RLA Test</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Payment', {
          userId,  // Pass the UserId as a prop
          testName: 'Autism Test',
        })}>
            <Image source={require('../assets/Test.png')} style={styles.cardImage} />
            <Text style={styles.cardText}>Take the Autism Test</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Contact', {
          userId,  // Pass the UserId as a prop
        })}>
            <Image source={require('../assets/Contact.png')} style={styles.cardImage} />
            <Text style={styles.cardText}>Contact Us</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomNavigation}>

          <AnimatedIcon
            name="comments"
            size={width * 0.08}
            isActive={isActive('Feedback')}
            label="Feedback"
            onPress={() => navigation.navigate('Feedback', {
              userId  // Pass the UserId as a prop
            })}
          />

          <AnimatedIcon
            name="phone"
            size={width * 0.08}
            isActive={isActive('Contact')}
            label="Contact"
            onPress={() => navigation.navigate('Contact', {
              userId  // Pass the UserId as a prop
            })}
          />

          <AnimatedIcon
            name="home"
            size={width * 0.08}
            isActive={isActive('Dashboard')}
            label="Home"
            onPress={() => navigation.navigate('Dashboard', {
              userId  // Pass the UserId as a prop
            })}
          />

          {/* <AnimatedIcon
            name="bar-chart"
            size={width * 0.08}
            isActive={isActive('Reports')}
            label="Reports"
            onPress={() => navigation.navigate('Reports', {
              userId  // Pass the UserId as a prop
            })}
          /> */}

          <AnimatedIcon
            name="user-circle"
            size={width * 0.08}
            isActive={isActive('UserData')}
            label="Profile"
            onPress={() => navigation.navigate('UserData', {
              userId  // Pass the UserId as a prop
            })}
          />

        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // Ensure content and bottom navigation are spaced correctly
    backgroundColor: '#99E7E1',
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50, // Adjust based on your design needs
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    alignItems: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Equally distribute icons
    backgroundColor: '#E9FEFF',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    borderRadius: 20,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  tabContainer: {
    flex: 1, // Distribute space equally
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

export default Dashboard;
