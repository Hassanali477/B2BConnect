import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('AppStarter');
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/SplashScreen.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 250,
  },
  text: {
    color: 'black',
    marginTop: 20,
    fontSize: 24,
  },
});
