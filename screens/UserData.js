import React, { useRef, useEffect, useCallback, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Animated, ScrollView, BackHandler, Image, Alert } from 'react-native';
import { useFonts, LexendDeca_700Bold } from '@expo-google-fonts/lexend-deca';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const fetchUserData = async (userId) => {
  try {
    const response = await fetch(`https://koshishcdc.com/api/User/GetUserDetails?UserId=${userId}`);
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

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

const UserData = () => {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params;

  let [fontsLoaded] = useFonts({
    LexendDeca_700Bold,
    Inter_400Regular,
  });

  const isActive = (screen) => route.name === screen;

  useFocusEffect(
    useCallback(() => {
      console.log('UserId in UserData:', userId);
    }, [userId])
  );

  useFocusEffect(
    useCallback(() => {
      console.log('UserId in Contact:', userId);

      const onBackPress = () => {
        navigation.navigate('Dashboard', { userId });
        return true; // Prevent default back button behavior
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [userId, navigation])
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUserData(userId);
      setUserData(data);
    };

    fetchData();
  }, [userId]);

  if (!fontsLoaded || !userData) {
    return <AppLoading />;
  }

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        {
          text: "Logout",
          onPress: () => navigation.navigate('RegisterLogin', {
            resetFields: true, // Pass the resetFields parameter
          })
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.header}>
          <Image source={require('../assets/User.png')} style={styles.profileImage} />
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoBlock}>
            <Text style={styles.infoTitle}>Parent Name</Text>
            <Text style={styles.infoText}>{userData.parentName}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoTitle}>Email</Text>
            <Text style={styles.infoText}>{userData.emailId}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoTitle}>Phone Number</Text>
            <Text style={styles.infoText}>{userData.mobile}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoTitle}>Child Name</Text>
            <Text style={styles.infoText}>{userData.childName}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoTitle}>Child Date of Birth</Text>
            <Text style={styles.infoText}>{new Date(userData.childDOB).toLocaleDateString()}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoTitle}>Child Gender</Text>
            <Text style={styles.infoText}>{userData.childGender}</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
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
    backgroundColor: '#99E7E1',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scrollContentContainer: {
    flexGrow: 1,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  parentName: {
    fontSize: 22,
    fontFamily: 'LexendDeca_700Bold',
    color: '#333',
    textAlign: 'center',
  },
  email: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#666',
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '100%',
    padding: 20,
    elevation: 10,
  },
  infoBlock: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 16,
    fontFamily: 'LexendDeca_700Bold',
    color: '#333',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
    color: '#666',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E9FEFF',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderRadius: 20,
    width: '100%',
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
  logoutButton: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20, // Add some space between the last infoBlock and the Logout button
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
});

export default UserData;
