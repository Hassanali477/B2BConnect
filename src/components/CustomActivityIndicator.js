import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, Animated, Easing, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const CustomActivityIndicator = ({size = 100}) => {
  const pulseValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulse = () => {
      pulseValue.setValue(0);
      Animated.timing(pulseValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start(() => pulse());
    };

    pulse();
  }, [pulseValue]);

  const pulseScale = pulseValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.2, 1],
  });

  return (
    <View style={[styles.container, {width, height}]}>
      <Animated.View
        style={[
          styles.spinner,
          {width: size, height: size},
          {transform: [{scale: pulseScale}]},
        ]}>
        <View style={styles.circleContainer}>
          <View style={[styles.circle, styles.outerCircle]} />
          <View style={[styles.circle, styles.middleCircle]} />
          <View style={[styles.circle, styles.innerCircle]} />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // Transparent background
    zIndex: 9999,
  },
  spinner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: 'white', // Default color
  },
  outerCircle: {
    backgroundColor: '#3498db',
  },
  middleCircle: {
    backgroundColor: '#2ecc71',
  },
  innerCircle: {
    backgroundColor: '#e74c3c',
  },
});

export default CustomActivityIndicator;
