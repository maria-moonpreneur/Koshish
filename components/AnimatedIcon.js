import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const AnimatedIcon = ({ name, size, isActive, label }) => {
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
        useNativeDriver: false, // Background animation needs to affect non-animated styles, hence false
      }),
    ]).start();
  }, [isActive]);

  const backgroundColor = backgroundAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', '#E8E8F8'], // Background color transition
  });

  return (
    <TouchableOpacity activeOpacity={1} style={styles.tabContainer}>
      <Animated.View style={[styles.iconTextContainer, { backgroundColor }]}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }], opacity: opacityAnim }}>
          <FontAwesome name={name} size={size} color="#000" />
        </Animated.View>
        <Text style={styles.label}>{label}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    alignItems: 'center',
  },
  iconTextContainer: {
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#000',
    marginTop: 5, // Adds some spacing between the icon and the text
  },
});

export default AnimatedIcon;
