import React, { useRef, useEffect, useCallback } from 'react';
import { View, Text, Animated, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView, BackHandler } from 'react-native';
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

const Contact = ({ route }) => {
  let [fontsLoaded] = useFonts({
    LexendDeca_700Bold,
    Inter_400Regular,
  });

  const navigation = useNavigation();
  const currentRoute = useRoute();
  const { userId } = route.params;

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

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const isActive = (screen) => currentRoute.name === screen;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.imageContainer}>
          <Image source={require('../assets/Email.png')} style={styles.envelopeImage} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Drop us a message</Text>

          <TouchableOpacity
            style={styles.infoContainer}
            onLongPress={() => copyToClipboard('koshishcdc@gmail.com')}
          >
            <FontAwesome name="envelope" size={30} isActive={false} />
            <Text style={styles.infoText}>koshishcdc@gmail.com</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.infoContainer}
            onLongPress={() => copyToClipboard('72760 57864')}
          >
            <FontAwesome name="phone" size={34} isActive={false} />
            <Text style={styles.infoText}>72760 57864</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.infoContainer}
            onLongPress={() => copyToClipboard('Garden Plaza, 104, Wakad Five Gardens Road, Rahatani, Pimpri-Chinchwad, Maharashtra 411027, India')}
          >
            <FontAwesome name="map-marker" size={34} isActive={false} />
            <Text style={styles.addressText}>
              Garden Plaza, 104, Wakad Five Gardens Road, {'\n'}
              Rahatani, Pimpri-Chinchwad, {'\n'}
              Maharashtra 411027, India
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.bottomNavigation}>
        <AnimatedIcon
          name="comments"
          size={width * 0.08}
          isActive={isActive('Feedback')}
          label="Feedback"
          onPress={() => navigation.navigate('Feedback', { userId })}
        />

        <AnimatedIcon
          name="phone"
          size={width * 0.08}
          isActive={isActive('Contact')}
          label="Contact"
          onPress={() => navigation.navigate('Contact', { userId })}
        />

        <AnimatedIcon
          name="home"
          size={width * 0.08}
          isActive={isActive('Dashboard')}
          label="Home"
          onPress={() => navigation.navigate('Dashboard', { userId })}
        />

        {/* <AnimatedIcon
          name="bar-chart"
          size={width * 0.08}
          isActive={isActive('Reports')}
          label="Reports"
          onPress={() => navigation.navigate('Reports', { userId })}
        /> */}

        <AnimatedIcon
          name="user-circle"
          size={width * 0.08}
          isActive={isActive('UserData')}
          label="Profile"
          onPress={() => navigation.navigate('UserData', { userId })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'space-between', // Ensure content and bottom navigation are spaced correctly
    alignItems: 'center',
  },
  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: height * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  envelopeImage: {
    width: width * 0.4,
    height: height * 0.45,
    resizeMode: 'contain',
    marginTop: 30,
  },
  contentContainer: {
    width: width,
    padding: 20,
    backgroundColor: '#99E7E1',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  title: {
    fontSize: width * 0.07,
    fontFamily: 'LexendDeca_700Bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  infoText: {
    fontSize: width * 0.04,
    fontFamily: 'Inter_400Regular',
    color: '#333',
    textAlign: 'center',
  },
  addressText: {
    fontSize: width * 0.035,
    fontFamily: 'Inter_400Regular',
    color: '#333',
    textAlign: 'center',
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
    width: '100%',
    position: 'absolute',
    bottom: 0, // Position at the bottom of the screen
  },
  navItem: {
    alignItems: 'center',
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

export default Contact;
