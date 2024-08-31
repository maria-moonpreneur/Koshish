import React, { useRef, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native';
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

const Reports = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params;

  useFocusEffect(
    useCallback(() => {
      console.log('UserId in Reports:', userId);
    }, [userId])
  );

  const isActive = (screen) => route.name === screen;

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.text}>Reports</Text>
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

          <AnimatedIcon
            name="bar-chart"
            size={width * 0.08}
            isActive={isActive('Reports')}
            label="Reports"
            onPress={() => navigation.navigate('Reports', {
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
    flex: 1,
    justifyContent: 'space-between', // Ensure content and bottom navigation are spaced correctly
    backgroundColor: '#99E7E1',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000', // Black text color
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

export default Reports;
